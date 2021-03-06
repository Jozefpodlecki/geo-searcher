import { LatLng, LatLngExpression, LeafletMouseEvent, Map } from "leaflet";
import React, { ChangeEvent, FunctionComponent, useCallback, useEffect, useState } from "react";
import { MapContainer, Marker, Polygon, Polyline, Popup, TileLayer, useMapEvents, GeoJSON } from "react-leaflet";
import styles from "./app.scss"
import CountryLayer from "components/CountryLayer";
import Interaction from "components/Interaction";
import { places as _places } from "assets";
import { getPlaceInfoByLatLngAsync } from "api";
import Tooltip from "components/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const App: FunctionComponent = () => {
	const [{
		iso_a3,
		position,
		places,
		selectedCountry,
	}, setState] = useState({
		iso_a3: "",
		selectedCountry: {
			iso_a3: "",
		},
		position: {
			lat: 51,
			lng: 1,
		},
		places: _places
	});
	const [info, setTooltip] = useState({
		region: undefined,
		continent: undefined,
		city: undefined,
		province: undefined,
		country: undefined,
		type: "land",
		latlng: null,
	})

	const onClick = (latlng: LatLng, map: Map) => {
		getPlaceInfoByLatLngAsync(latlng)
		.then(info => {
			const iso_a3 = info?.ISO_A3;

			map.setView(latlng, 4);

			setState(state => ({
				...state,
				position: latlng,
				selectedCountry: {
					iso_a3,
				}
			}));
			setTooltip(state => ({
				...state,
				latlng,
				...info
			}));
		})
	}

	const onSearch = (event: React.MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
	}

	const onMouseOver = useCallback((latlng: LatLng) => {

		getPlaceInfoByLatLngAsync(latlng)
			.then(info => {
				const iso_a3 = info?.ISO_A3;

				setState(state => ({...state, iso_a3}));
				setTooltip(state => ({
					...state,
					latlng,
					...info
				}));
			})
		
	}, []);

	return <div>
		<MapContainer
			zoomControl={false}
			className={styles.container}
			center={position}
			zoom={3}
			minZoom={3}
			worldCopyJump={true}
			fadeAnimation={true}
			scrollWheelZoom={true}>
			<div className={styles.topnav}>
				<div className={styles.icon} onClick={onSearch}>
					<FontAwesomeIcon icon={faSearch}/>
				</div>
			</div>
			<Tooltip {...info}/>
			<Interaction
				onClick={onClick}
				onMouseOver={onMouseOver}/>
			{places.features.map((geojson) => 
				<CountryLayer
					key={geojson.properties.admin}
					isHovering={geojson.properties.iso_a3 === iso_a3}
					isSelected={selectedCountry && geojson.properties.iso_a3 === selectedCountry.iso_a3}
					geojson={geojson} />)}
		</MapContainer>
	</div>
};

export default App;

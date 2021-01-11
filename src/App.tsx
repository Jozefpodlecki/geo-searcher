import { LatLngExpression, LeafletMouseEvent } from "leaflet";
import React, { ChangeEvent, FunctionComponent, useCallback, useEffect, useState } from "react";
import { MapContainer, Marker, Polygon, Polyline, Popup, TileLayer, useMapEvents, GeoJSON, Tooltip } from "react-leaflet";
import world from "assets/world.json";
import countries from "assets/countries.json";
import styles from "./app.scss"
import { getPlaceInfoByLatLngAsync } from "api";

const Test = () => {
	const [value, setValue] = useState("");
	const [isVisible, setVisible] = useState(false);
	const [{
		city,
		province,
		country,
		latlng,
	}, setState] = useState({
		city: undefined,
		province: undefined,
		country: undefined,
		type: "land",
		latlng: null,
	})
	const map = useMapEvents({
		mousemove(event: LeafletMouseEvent) {
			
			getPlaceInfoByLatLngAsync(event.latlng)
				.then(info => {
					setState(state => ({
						...state,
						latlng: event.latlng,
						...info
					}));
				})
		}
	})
	

	const onChange = (event: any) => {
		setValue(event.currentTarget.value);
	}

	const limeOptions = { color: 'lime' }

	const multiPolygon: LatLngExpression[][]  = [
		[
		  [51.51, -0.12],
		  [51.51, -0.13],
		  [51.53, -0.13],
		],
		[
		  [51.51, -0.05],
		  [51.51, -0.07],
		  [51.53, -0.07],
		],
	]

	return <div>
		<Polygon pathOptions={limeOptions} positions={multiPolygon} />
		<div className={styles.tooltip}>
			{country ? <div>Country: {country}</div> : null}
			{city ? <div>City: {city}</div> : null}
			{city ? <div>Province: {province}</div> : null}
			{latlng ? <div>
				<div>Latitude {latlng.lat.toFixed(4)}</div>
				<div>Longitude {latlng.lng.toFixed(4)}</div>
			</div> : null}
		</div>
		<div className={`${styles.overlay} ${isVisible ? styles.visible : ""}`}>
			<div>
				<div className={styles.header}>
					What are  you looking for?
				</div>
				<div>
					<input
						className={styles.input}
						type="text"
						value={value}
						onChange={onChange}/>
				</div>
			</div>
		</div>
	</div>
}

const App: FunctionComponent = () => {
	
	const position = {
		lat: 51,
		lng: 10
	};

	var myCustomStyle = {
		stroke: true,
		fill: true,
		weight: 1,
		color: "gray",
		fillColor: 'transparent',
		fillOpacity: 1
	}
        
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
			<Test/>
			{/* <GeoJSON
				style={myCustomStyle}
				data={world as any}/> */}
			<GeoJSON
				style={myCustomStyle}
				data={countries as any}/>
		</MapContainer>
	</div>
};

export default App;

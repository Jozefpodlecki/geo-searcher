import { LatLng, LeafletMouseEvent, Map } from "leaflet";
import React, { FunctionComponent } from "react";
import { useMapEvents } from "react-leaflet";

type Props = {
    onClick(latlng: LatLng, map: Map): void;
    onMouseOver(latlng: LatLng, map: Map): void;
}

const Interaction: FunctionComponent<Props> = ({
    onClick,
    onMouseOver,
}) => {
	const map = useMapEvents({
		mousemove(event: LeafletMouseEvent) {
            onMouseOver(event.latlng, map);
        },
        click(event: LeafletMouseEvent) {
            onClick(event.latlng, map);
        }
	})

	return <div></div>
}

export default Interaction;
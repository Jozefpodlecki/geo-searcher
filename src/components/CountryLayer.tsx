import { GeoJsonTypes } from "geojson";
import React, { FunctionComponent, memo, useCallback, useEffect, useMemo, useRef } from "react";
import { GeoJSON } from "react-leaflet";

type Geojson = {
    type: GeoJsonTypes;
    properties: Record<string, string>;
    coordinates?: number[] | number[][] | number[][][];
}

type Props = {
    isHovering: boolean;
	isSelected: boolean;
	geojson: Geojson;
}

const style = ({
    stroke: true,
    fill: true,
    weight: 1,
    color: "gray",
    fillColor: 'transparent',
    fillOpacity: 1,
    transition: "color .3s"
});

const CountryLayer: FunctionComponent<Props> = ({
    isHovering,
	isSelected,
	geojson,
}) => {
    const computedStyle = useMemo(() => {
        return {
            color: isHovering || isSelected ? "white" : "gray"
        }
    }, [isSelected]);

	return <GeoJSON
        pathOptions={computedStyle}
		style={style}
		data={geojson}/>
}

export default memo(CountryLayer);
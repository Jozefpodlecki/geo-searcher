import _placesGeojson from "assets/places.json";
import { GeoJsonTypes } from "geojson";

type PlacesGeojsonType = {
    type: GeoJsonTypes;
    features: {
        type: GeoJsonTypes;
        properties: Record<string, any>;
        coordinates?: number[] | number[][] | number[][][];
    }[]
}

export const places = _placesGeojson as PlacesGeojsonType;
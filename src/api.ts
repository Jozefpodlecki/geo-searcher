import { LatLng } from "leaflet"
import PolygonLookup from "polygon-lookup";
import countries from "assets/countries.json";

const lookup = new PolygonLookup(countries as any);

export const getPlaceInfoByLatLngAsync = ({lat, lng}: LatLng) => {
    const result = lookup.search(lng, lat);
    let object;

    if(result) {
        const { properties } = result as any;
        
        object = {
            type: "country",
            country: properties.ADMIN,
        }
    }

    return Promise.resolve(object)
}
import { LatLng } from "leaflet"
import PolygonLookup from "polygon-lookup";
import countries from "assets/countries.json";
import administrativeBoundaries from "assets/world-administrative-boundaries.json";
import { Descriptor } from "models/Descriptor";

const countriesLookup = new PolygonLookup(countries as any);
const administrativeBoundariesLookup = new PolygonLookup(administrativeBoundaries as any);


export const getPlaceInfoByLatLngAsync = ({lat, lng}: LatLng) => {
    const country = countriesLookup.search(lng, lat);
    const administrativeBoundary = administrativeBoundariesLookup.search(lng, lat);

    let object: Descriptor = {
        continent: undefined,
        region: undefined,
        country: undefined,
    };

    if(country) {
        const { properties } = country as any;
        
        object = {
            ...object,
            country: properties.ADMIN,
            ISO_A3: properties.ISO_A3,
        }
    }

    if(administrativeBoundary) {
        const { properties } = administrativeBoundary as any;

        object = {
            ...object,
            continent: properties.continent,
            region: properties.continent,
            country: properties.name,
        }
    }

    return Promise.resolve(object)
}
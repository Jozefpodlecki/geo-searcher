import { LatLng } from "leaflet";
import React, { FunctionComponent } from "react";
import styles from "./tooltip.scss"

type Props = {
    continent?: string;
    region?: string;
    country?: string;
    city?: string;
    province?: string;
    latlng?: LatLng;
}

const Tooltip: FunctionComponent<Props> = ({
    city,
    continent,
    region,
    country,
    province,
    latlng,
}) => {
    return <div className={styles.tooltip}>
        {continent ? <div>Continent: {continent}</div> : null}
        {region ? <div>Region: {region}</div> : null}
        {country ? <div>Country: {country}</div> : null}
        {city ? <div>City: {city}</div> : null}
        {province ? <div>Province: {province}</div> : null}
        {latlng ? <div>
            <div>Latitude {latlng.lat.toFixed(4)}</div>
            <div>Longitude {latlng.lng.toFixed(4)}</div>
        </div> : null}
    </div>
}

export default Tooltip;
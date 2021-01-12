import { LatLng } from "leaflet";
import React, { FunctionComponent, useState } from "react";
import styles from "./tooltip.scss"

type Props = {

}

const Search: FunctionComponent<Props> = ({

}) => {
    const isVisible = false;

    const [value, setValue] = useState("");

    const onChange = (event: any) => {
		setValue(event.currentTarget.value);
	}

    return <div className={`${styles.overlay} ${isVisible ? styles.visible : ""}`}>
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
}

export default Search;
import * as React from 'react'
import {FC} from "react";
import {AssetI} from "../../pages/Assets/types";
import styles from './AssetStyles.module.sass';
import {Tag} from "../utils/tag/Tag";
export const Asset: FC<AssetI> = (props) => {
    return (
        <div className={styles.asset}>
            <h2>
                {props.name}
            </h2>
            <p>
                {props.usdAmount}$
            </p>
            <p>
                {props.assetAmount}{props.name}
            </p>
            <h3>{props.exchange}</h3>
            <div className={styles.asset__tags}>
                {props.tags.map(i => <Tag text={i}/>)}
            </div>
        </div>
    )
}
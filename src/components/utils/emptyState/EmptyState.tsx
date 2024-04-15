import * as React from 'react';
import {CSSProperties, FC} from "react";
import {ReactComponent as EmptyIcon} from '../../../static/svg/browser.svg';
import styles from './EmptyStateStyles.module.sass';
interface Props{
    title: string,
    description: string,
    styles?: CSSProperties
}

export const EmptyState: FC<Props> = (props) => {
    return (
        <div style={props.styles} className={styles.empty}>
            <EmptyIcon/>
            <h1>
                {props.title}
            </h1>
            <p>
                {props.description}
            </p>
        </div>
    )
}
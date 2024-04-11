import * as React from 'react';
import {FC} from "react";
import styles from './FormItemStyles.module.sass';

interface Props {
    children: React.ReactNode,
    label: string,
    isRequired?: boolean,
    errors?: string[]
}

export const FormItem: FC<Props> = (props) => {
    return (
        <div className={styles.formItem}>
            <div className={styles.label}>
                {props.isRequired && <p className={styles.required}>*</p>}
                <p>
                    {props.label}
                </p>
            </div>
            <div className={styles.content}>{props.children}</div>
            <div style={{minHeight: '16px'}}>
                {props.errors?.map(err =>
                    <p className={styles.error}>{err}</p>
                )}
            </div>
        </div>
    )
}
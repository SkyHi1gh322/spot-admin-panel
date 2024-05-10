import {FC} from "react";
import styles from './CheckboxStyles.module.sass';
interface Props{
    name: string
    checked: boolean
    onChange: (value: boolean) => void
    label: string
}

export const Checkbox: FC<Props> = (props) => {
    return (
        <label className={styles.checkbox}>
            <input
                type="checkbox"
                name={props.name}
                checked={props.checked}
                onChange={() => {
                    props.onChange(!props.checked);
                }}
            />
            <p>{props.label}</p>
        </label>
    );
};
import {FC} from "react";
import styles from './TagStyles.module.sass';

interface Props{
    text: string,
    color?: string,
    onClick?: () => void
}

export const Tag: FC<Props> = (props) => {
    return(
            <div className={styles.tag} style={{background: props.color}} onClick={props.onClick}>{props.text}</div>
    )
}
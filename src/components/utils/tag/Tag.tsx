import {FC} from "react";
import styles from './TagStyles.module.sass';
import {getRandomColorFromList} from "../../../functions";

interface Props{
    text: string,
    color?: string,
    onClick?: () => void
}

export const Tag: FC<Props> = (props) => {
    return(
            <div className={styles.tag} style={{background: props.color || getRandomColorFromList()}} onClick={props.onClick}>{props.text}</div>
    )
}
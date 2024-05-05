import {PlacesType, Tooltip as ReactTooltip} from 'react-tooltip';
import {FC} from "react";
import styles from './TooltipStyles.module.sass';
interface Props{
    id: string,
    openOnClick?: boolean,
    place?: PlacesType,
    variant?: 'dark' | 'light'
    clickable?: boolean,
    className?: string,
    children: React.ReactNode
}

export const Tooltip: FC<Props> = (props) => {
    return (
        <ReactTooltip {...props} className={`${styles.customTooltip} ${props.className}`}>
            {props.children}
        </ReactTooltip>
    )
}
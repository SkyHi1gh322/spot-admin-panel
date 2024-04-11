import * as React from 'react';
import {FC} from "react";
import styles from './DrawerStyles.module.sass';
import {createPortal} from "react-dom";
import {ReactComponent as CrossIcon} from '../../../static/svg/cross.svg'
interface Props{
    children: React.ReactNode,
    onClose: () => void,
    title: string
}


export const Drawer: FC<Props> = (props) => {

    const onEscape = (e:  React.KeyboardEvent<HTMLDivElement>) => {
        if(e.code === 'Escape'){
            props.onClose?.();
        }
    }

    return createPortal(<div onKeyDown={onEscape} tabIndex={0} className={styles.drawerWrapper}>
        <div className={styles.drawerWrapper__fade}></div>
        <div className={styles.drawerWrapper__drawer}>
            <div className={styles.drawerWrapper__drawer__content}>
                <div className={styles.drawerWrapper__drawer__content__header}>
                    <h3>{props.title}</h3>
                    <CrossIcon onClick={props.onClose}/>
                </div>
                <div className={styles.drawerWrapper__drawer__content__children}>
                    {props.children}
                </div>
            </div>
        </div>
    </div>, document.body)
}
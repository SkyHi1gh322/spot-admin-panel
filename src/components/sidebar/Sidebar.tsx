import * as React from 'react';
import {Link} from "react-router-dom";
import {ListRoutes} from "../../routes/routes";
import {FC} from "react";
import styles from './SidebarStyles.module.sass';
export const Sidebar: FC = () => {
    return(
        <aside className={styles.sidebar}>
            <Link className={styles.sidebar__link} to={ListRoutes.ASSETS.LIST.pageName()}>Assets</Link>
            <Link className={styles.sidebar__link} to={ListRoutes.ASSETS.ASSET.pageName('25')}>Dashboard</Link>
            <Link className={styles.sidebar__link} to={ListRoutes.ASSETS.ASSET.pageName('25')}>Check list</Link>
            <Link className={styles.sidebar__link} to={ListRoutes.FAVOURITE_TRADERS.PAGE.pageName()}>Favourite traders</Link>

        </aside>
    )
}
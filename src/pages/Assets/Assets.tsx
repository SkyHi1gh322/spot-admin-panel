import * as React from 'react';
import {FC} from "react";
import {Navigate, NavLink, Outlet} from "react-router-dom";
import {ListRoutes} from "../../routes/routes";
import styles from './AssetsStyles.module.sass';
import {ReactComponent as ListIcon} from '../../static/svg/rectangle-list.svg';
import {ReactComponent as DashboardIcon} from '../../static/svg/chart-histogram.svg';
import {useLocation} from "react-router";
import {TraderInfo} from "../../components/TraderInfo/TraderInfo";
export const Assets: FC = () => {
    const location = useLocation();

    const isDefaultPage = ListRoutes.ASSETS.pageName === location.pathname

    return (
        <div className={styles.assets}>
            <div className={styles.assets__tabs}>
                <NavLink to={ListRoutes.ASSETS.LIST.pageName()}
                         className={({isActive}) => `${styles.assets__tabs__route} ${(isActive || isDefaultPage) && styles.assets__tabs__routeActive}`}>
                    <ListIcon/>
                    <p>Assets list</p>
                </NavLink>
                <NavLink to={ListRoutes.ASSETS.DASHBOARD.pageName}
                         className={({isActive}) => `${styles.assets__tabs__route} ${isActive && styles.assets__tabs__routeActive}`}
                >
                    <DashboardIcon/>
                    <p>
                        Dashboard
                    </p>
                </NavLink>
            </div>
            <TraderInfo/>
            <Outlet/>
        </div>
    )
}
import * as React from 'react';
import {Link, NavLink} from "react-router-dom";
import {ListRoutes} from "../../routes/routes";
import {FC} from "react";
import styles from './SidebarStyles.module.sass';
import {ReactComponent as AssetIcon} from '../../static/svg/briefcase.svg';
import {ReactComponent as NewsIcon} from '../../static/svg/newspaper-open.svg';
import {ReactComponent as CheckListIcon} from '../../static/svg/budget-alt.svg';
import {ReactComponent as SettingsIcon} from '../../static/svg/settings.svg';
import {Avatar} from "../utils/avatar/Avatar";
export const Sidebar: FC = () => {
    return(
        <aside className={styles.sidebar}>
            <div className={styles.avatar_wrapper}>
                <Avatar url={'IT'} username={'Ilya Tormanov'}/>
            </div>
            <div className={styles.links}>
                <NavLink  className={({isActive}) => isActive ? styles.sidebar__linkActive : styles.sidebar__link} to={ListRoutes.ASSETS.pageName}>
                    <AssetIcon/>
                    <p>Assets</p>
                </NavLink>
                <NavLink  className={({isActive}) => isActive ? styles.sidebar__linkActive : styles.sidebar__link} to={ListRoutes.NEWS.pageName}>
                    <NewsIcon/>
                    <p>News</p>
                </NavLink >
                <NavLink  className={({isActive}) => isActive ? styles.sidebar__linkActive : styles.sidebar__link} to={ListRoutes.ASSETS.ASSET.pageName('25')}>
                    <CheckListIcon/>
                    <p>Check list</p>
                </NavLink >
            </div>
            <div className={styles.favourites}>
                <div className={styles.favourites__title}>Favourite traders</div>
                <div className={styles.favourites__list}>
                    <div className={styles.favourites__list__avatarWrapper}>
                        <Avatar url={'IT'} className={styles.avatar} username={'Golden Garr'}/>
                        <div className={styles.todayProfitPlus}>+24%</div>
                    </div>
                    <div className={styles.favourites__list__avatarWrapper}>
                        <Avatar url={'IT'} className={styles.avatar} username={'Ilya Tormanov'}/>
                        <div className={styles.todayProfitPlus}>+20%</div>
                    </div>
                    <div className={styles.favourites__list__avatarWrapper}>
                        <Avatar url={'IT'} className={styles.avatar} username={'Vasili Pupkin'}/>
                        <div className={styles.todayProfitPlus}>+13%</div>
                    </div>
                    <div className={styles.favourites__list__avatarWrapper}>
                        <Avatar url={'IT'} className={styles.avatar} username={'Gicha de Karta'}/>
                        <div className={styles.todayProfitPlus}>+2%</div>
                    </div>
                    <div className={styles.favourites__list__avatarWrapper}>
                        <Avatar url={'IT'} className={styles.avatar} username={'ZXCH12352'}/>
                        <div className={styles.todayProfitMinus}>-16%</div>
                    </div>
                </div>
                <div className={styles.favourites__showAll}>
                    Show all ...
                </div>
            </div>
            <div className={styles.settings}>
                <NavLink className={({isActive}) => isActive ? styles.sidebar__linkActive : styles.sidebar__link} to={ListRoutes.SETTINGS.pageName}>
                    <SettingsIcon/>
                    <p>Settings</p>
                </NavLink>
            </div>
        </aside>
    )
}
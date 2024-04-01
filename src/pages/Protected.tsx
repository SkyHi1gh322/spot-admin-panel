import * as React from 'react';
import {FC} from "react";
import {Sidebar} from "../components/sidebar/Sidebar";
import {Route, Routes} from "react-router-dom";
import {ListRoutes} from "../routes/routes";
import styles from './ProtectedStyles.module.sass';
export const ProtectedPage: FC = () => {
    return (
        <main className={styles.protected}>
            <Sidebar/>
            <div className={styles.protected__page}>
                <Routes>
                    <Route path={ListRoutes.ASSETS.LIST.pageName()} element={ListRoutes.ASSETS.LIST.component}/>
                    <Route path={ListRoutes.FAVOURITE_TRADERS.PAGE.pageName()} element={ListRoutes.FAVOURITE_TRADERS.PAGE.component}/>
                    <Route path="/"/> {/* 👈 Renders at /app/ */}
                </Routes>
            </div>
        </main>
    )
}
import * as React from 'react';
import {FC} from "react";
import {useSelector} from "../../redux/store";
import styles from './DashboardStyles.module.sass';
import {PieBlock} from "./PieBlock";
import {Chart} from "./Chart";
import {EmptyState} from "../../components/utils/emptyState/EmptyState";
export const Dashboard: FC = () => {
    const assets = useSelector((state) => state.assets.list);

    return(
        <div className={styles.dashboard}>
            {assets.length ?
                <>
                    <PieBlock/>
                    <Chart/>
                </>
            :
                <EmptyState
                    styles={{marginTop: '140px'}}
                    title={'Empty dashboard'}
                    description={"Because you don't have available assets we cant provide you details and chart. Please, create at least one asset"}
                />
            }
        </div>
    )
}
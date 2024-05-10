import * as React from 'react';
import {FC} from "react";
import {useSelector} from "../../redux/store";
import styles from './DashboardStyles.module.sass';
import {PieBlock} from "./Pie/PieBlock";
import {Chart} from "./Chart/Chart";
import {EmptyState} from "../../components/utils/emptyState/EmptyState";
import {TransactionsHistory} from "./History/TransactionsHistory";
export const Dashboard: FC = () => {
    const assets = useSelector((state) => state.assets.list);
    return(
        <div className={styles.dashboard}>
            {assets.length ?
                <>
                    <h1 className={styles.dashboard__chartsTitle}>
                        Trader statistics
                    </h1>
                    <div className={styles.dashboard__charts}>
                        <PieBlock/>
                        <Chart/>
                    </div>
                    <h1 className={styles.dashboard__historyTitle}>
                        Transactions history
                    </h1>
                    <TransactionsHistory/>
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
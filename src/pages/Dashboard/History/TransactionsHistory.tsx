import * as React from 'react';
import {FC} from "react";
import styles from './TransactionsHistoryStyles.module.sass';
import TestLogo from "../../../static/solana.jpg";
import TestExchangeLogo from "../../../static/binance.png";
import {Tag} from "../../../components/utils/tag/Tag";
interface History{
    coin: string,
    coinLogo: string,
    amount: number,
    coinShortName: string,
    fixedProfitInPercentage: number,
    buyDate: string,
    sellDate: string | null,
    exchangeProvider: string,
    status: 'SOLD' | 'ACTIVE'

}
export const TransactionsHistory: FC = () => {
    const mock: History[] = [
        {
            amount: 150,
            buyDate: "24.03.2022",
            coin: "DogeCoin",
            coinLogo: TestLogo,
            coinShortName: "DOGE",
            fixedProfitInPercentage: -15,
            sellDate: "30.03.2022",
            exchangeProvider: 'KuCoin',
            status: 'SOLD',
        },
        {
            amount: 200,
            buyDate: "18.09.2023",
            coin: "Ethereum",
            coinLogo: TestLogo,
            coinShortName: "ETH",
            fixedProfitInPercentage: 120,
            sellDate: null,
            exchangeProvider: 'Binance',
            status: 'ACTIVE'
        },
        {
            amount: 500,
            buyDate: "11.09.2021",
            coin: "Bitcoin",
            coinLogo: TestLogo,
            coinShortName: "BTC",
            fixedProfitInPercentage: 2,
            sellDate: "25.05.2024",
            exchangeProvider: 'Bitget',
            status: 'ACTIVE'
        }
    ]


    return(
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Coin</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th>Profit</th>
                    <th>Provider</th>
                    <th>Buy date</th>
                    <th>Sell date</th>
                </tr>
            </thead>
            <tbody>
                {mock.map(transaction =>
                    <tr>
                        <td>
                           <div className={styles.table__coinInfo}>
                               <img src={transaction.coinLogo}/>
                               <h3>{transaction.coin}</h3>
                               <p>({transaction.coinShortName})</p>
                           </div>
                        </td>
                        <td>
                            <Tag text={transaction.status === 'SOLD' ? 'Inactive' : 'Active'}/>
                        </td>
                        <td>
                            <p>{transaction.amount} USD</p>
                        </td>
                        <td className={transaction.fixedProfitInPercentage < 0 ? styles.table__profitMinus : styles.table__profitPlus}>
                            <p>{transaction.fixedProfitInPercentage} %</p>
                        </td>
                        <td className={styles.table__provider}>
                            <img src={TestExchangeLogo}/>
                            <p>{transaction.exchangeProvider}</p>
                        </td>
                        <td>
                            <p>{transaction.buyDate}</p>
                        </td>
                        <td>
                            <p>{transaction.sellDate ?? '-'}</p>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}
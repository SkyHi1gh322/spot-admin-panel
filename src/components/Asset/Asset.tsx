import * as React from 'react'
import {FC} from "react";
import {AssetI, AssetModeEnum} from "../../pages/Assets/types";
import styles from './AssetStyles.module.sass';
import {Tag} from "../utils/tag/Tag";
import TestLogo from "../../static/solana.jpg";
import TestExchangeLogo from "../../static/binance.png";
import {ReactComponent as TrashIcon} from '../../static/svg/trash.svg';
import {ReactComponent as EditIcon} from '../../static/svg/pencil.svg';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ChartData, Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';
import {useSelector} from "../../redux/store";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
);


interface Props extends AssetI{
    setAssetsToRemove: React.Dispatch<React.SetStateAction<string[]>>,
    isMarked: boolean
}

export const Asset: FC<Props> = (props) => {
    const assetsActions = useSelector(state => state.assetsActions)
    const options = {
        responsive: true,
        scales: {
            y: {
                border: {
                    display: false
                },
                grid: {
                    display: false,
                    drawBorder: false
                },
                ticks: {
                    display: false
                },
            },
            x: {
                border: {
                    display: false
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            }
        }
    };

    const labels = ["", "", "", "" ,"" ,"" ,"" ,""];
    const data: ChartData<'line', number[], string> = {
        labels,
        datasets: [
            {
                fill: true,
                data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const onMarkAsset = () => {
        if(assetsActions.currentAction === AssetModeEnum.SELECT_MODE){
            if(props.isMarked){
                props.setAssetsToRemove((prev) => prev.filter(i => i !== props.name))
            }
            else{
                props.setAssetsToRemove((prev) => ([...prev, props.name]))
            }
        }
    }

    return (
        <tr className={`${styles.asset} ${props.isMarked && styles.assetToRemove}`} onClick={onMarkAsset}>
            <td>
               <div className={styles.asset__name}>
                   <img src={TestLogo}/>
                   <h3>
                       {props.name}
                   </h3>
                   <p>
                       (SOL)
                   </p>
               </div>
            </td>
            <td>
                <p>
                    {props.usdAmount} USD ( {props.assetAmount} {props.name} )
                </p>
            </td>
            <td>
                <div className={styles.asset__profit}>
                    <p className={styles.asset__profit__valueRed}>-15 USD (-2%)</p>
                </div>
            </td>
            <td>
                <Line className={styles.asset__canvas} data={data} options={options}/>
            </td>
            <td>
                <h3 className={styles.asset__exchange}>
                    <img src={TestExchangeLogo}/>
                    {props.exchange}
                </h3>
            </td>
            <td>
                <div className={styles.asset__tags}>
                    {props.tags?.map(i => <Tag key={i} text={i}/>)}
                </div>
            </td>
            <td>
                <div className={styles.actions}>
                    <EditIcon className={styles.actions__edit}/>
                    <TrashIcon className={styles.actions__delete}/>
                </div>
            </td>
        </tr>
    )
}
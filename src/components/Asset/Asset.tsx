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
    ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';
import {useSelector} from "../../redux/store";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
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
        <div className={`${styles.asset} ${props.isMarked && styles.assetToRemove}`} onClick={onMarkAsset}>
           <div className={styles.asset_content}>
               <div className={styles.asset_content__coin}>
                   <img src={TestLogo}/>
                   <div>
                       <h2>
                           {props.name}
                       </h2>
                       <p>
                           (SOL)
                       </p>
                   </div>
               </div>
               <div className={styles.asset_content__finances}>
                   <p>
                       {props.usdAmount} USD ( {props.assetAmount} {props.name} )
                   </p>
               </div>
               <div className={styles.asset_content__profit}>
                   <p className={styles.asset_content__profit__title}>
                       Current profit:
                   </p>
                   <p className={styles.asset_content__profit__valueRed}>-15 USD</p>
               </div>
               <Line className={styles.asset_content__canvas} data={data} options={options}/>
               <h3 className={styles.asset_content__exchange}>
                   <img src={TestExchangeLogo}/>
                   {props.exchange}
               </h3>
               <div className={styles.asset_content__tags}>
                   {props.tags?.map(i => <Tag key={i} text={i}/>)}
               </div>
           </div>
            <div className={styles.actions}>
                <EditIcon className={styles.actions__edit}/>
                <TrashIcon className={styles.actions__delete}/>
            </div>
        </div>
    )
}
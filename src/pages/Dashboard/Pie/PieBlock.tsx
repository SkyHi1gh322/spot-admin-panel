import * as React from 'react'
import {FC, useMemo, useState} from "react";
import {Group} from "@visx/group";
import Pie from "@visx/shape/lib/shapes/Pie";
import {AnimatedPie} from "./AnimatedPie";
import {AssetI} from "../../Assets/types";
import {LegendOrdinal} from "@visx/legend";
import styles from './PieBlockStyles.module.sass';
import {useSelector} from "../../../redux/store";
import {scaleOrdinal} from "@visx/scale";
import {getRandomColorFromList} from "../../../functions";
export const PieBlock: FC = () => {
    const assets = useSelector((state) => state.assets.list);
    const [selectedAsset, setSelectedAsset] = useState<AssetI | undefined>(undefined);

    const getArcColors = useMemo(() => {
        return scaleOrdinal({
            domain: assets.map(i => i.name),
            range: assets.map(() => getRandomColorFromList())
        });
    }, [assets])

    return (
        <div className={styles.dashboard}>
            <div className={styles.dashboard__pieBlock}>
                <div className={styles.dashboard__pieBlock__container}>
                    {selectedAsset ?
                        <div className={styles.dashboard__pieBlock__container__currentAsset}>
                            <h2>{selectedAsset?.name}</h2>
                            <h1>${selectedAsset?.usdAmount}</h1>
                            <h3>19.59%</h3>
                        </div>
                        :
                        <div className={styles.dashboard__pieBlock__container__balance}>
                            <h1>Total $500</h1>
                        </div>
                    }
                    <svg className={styles.svg} width={400} height={400}>
                        <Group top={200} left={200}>
                            <Pie
                                data={assets}
                                pieValue={(arc) => arc.usdAmount}
                                outerRadius={160}
                                innerRadius={160-50}
                                cornerRadius={3}
                                padAngle={0.005}
                            >
                                {(pie) => (
                                    <AnimatedPie<AssetI>
                                        {...pie}
                                        animate={true}
                                        getKey={(arc) => arc.data.name}
                                        onClickDatum={(data) =>
                                            setSelectedAsset(
                                                selectedAsset && selectedAsset.name === data.data.name ? undefined : data.data
                                            )
                                        }
                                        getColor={(arc) => getArcColors(arc.data?.name)}
                                    />
                                )}
                            </Pie>
                            <Pie
                                data={
                                    [selectedAsset]
                                }
                                pieValue={arc => arc?.usdAmount || 0 }
                                pieSortValues={() => -1}
                                outerRadius={100}
                            >
                                {(pie) => (
                                    // @ts-ignore
                                    <AnimatedPie<AssetI>
                                        {...pie}
                                        animate={true}
                                    />
                                )}
                            </Pie>
                        </Group>
                    </svg>
                    <LegendOrdinal
                        domain={assets.map(i => i.name)}
                        scale={getArcColors}
                    >
                        {labels =>
                            <div className={styles.legendList}>{labels.map(i => <div className={styles.legendItem}>
                                <div className={styles.legendItem__color} style={{background: i.value}}></div>
                                <div>{i.datum}</div>
                                <p>10%</p>
                            </div>)}</div>
                        }
                    </LegendOrdinal>
                </div>
            </div>
        </div>
    )
}
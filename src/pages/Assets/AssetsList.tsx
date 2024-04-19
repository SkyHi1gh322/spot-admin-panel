import * as React from 'react';
import {FC, useEffect, useState} from "react";
import styles from './AssetsListStyles.module.sass';
import {Asset} from "../../components/Asset/Asset";
import {useSelector} from "../../redux/store";
import {createAssetDrawerCall} from "./root";
import {AssetsActions} from "../../components/AssetsFilters/AssetsActions";
import {AssetModeEnum} from "./types";
import {AssetsFiltersPanel} from "../../components/AssetsFiltersPanel/AssetsFiltersPanel";
import {EmptyState} from "../../components/utils/emptyState/EmptyState";
export const AssetsList: FC = () => {
    const [assetsToRemove, setAssetsToRemove] = useState<string[]>([])
    const assets = useSelector(state => state.assets);
    const assetsActions = useSelector(state => state.assetsActions)
    createAssetDrawerCall.useIt();
 
    return (
        <div className={styles.assets}>
            <AssetsActions assetsToRemove={assetsToRemove} setAssetsToRemove={setAssetsToRemove}/>
            {assetsActions.currentAction === AssetModeEnum.FILTERS_MODE && <AssetsFiltersPanel/>}
            {assets.list.length ?
                <div>
                    <table className={styles.assets__list}>
                        <thead>
                            <tr>
                                <th>
                                    Token
                                </th>
                                <th>
                                    Usd amount
                                </th>
                                <th>
                                    All time profit
                                </th>
                                <th>
                                    24h change
                                </th>
                                <th>
                                    Exchange provider
                                </th>
                                <th>
                                    Tags
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {assets.list.map(asset =>
                            <Asset {...asset}
                                   setAssetsToRemove={setAssetsToRemove}
                                   isMarked={assetsToRemove.includes(asset.name)}
                                   key={asset.name}/>
                        )}
                        </tbody>
                    </table>
                </div>
                : <EmptyState
                    styles={{marginTop: '140px'}}
                    title={'No created assets'}
                    description={'Please, use filters panel to create new asset or copy existing from your favourite trader portfolio'}
                />
            }
        </div>
    )
}
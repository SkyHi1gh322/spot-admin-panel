import * as React from 'react';
import {FC, useState} from "react";
import {Input} from "../utils/input/Input";
import {Button} from "../utils/button/Button";
import {Select} from "../utils/select/Select";
import styles from './AssetsCreator.module.sass';
import {AssetI} from "../../pages/Assets/types";
import {useSetState} from "react-use";
interface Props{
    setAssets:  React.Dispatch<React.SetStateAction<AssetI[]>>
}

export const AssetCreator: FC<Props> = (props) => {
    const echangeList = [
        {name: 'Binance', id: 0,},
        {name: 'KuCoin', id: 1},
        {name: 'BitGet', id: 2},
        {name: 'BingX', id: 3}
    ]

    const tagList = [{
        name: 'Долгосрок',
    }, {name: 'MeMe'}, {name: 'Fast Money'}, {name: 'Prob scam'}];

    const [asset, setAsset] = useSetState<AssetI>({assetAmount: 0, exchange: "", name: "", tags: [], usdAmount: 0});

    const onCreate = () => {
        props.setAssets((prev) => [...prev, asset]);
    }

    return (
        <div className={styles.assetCreator}>
           <form>
               <div className={styles.assetCreator__block}>
                   <Input placeholder={'Введите название токена'}
                          onChange={(e) => setAsset({name: e.target.value})}
                          className={styles.assetCreator__block__field}/>
                   <Input placeholder={'Введите сумму покупки'}
                          className={styles.assetCreator__block__field}
                          type={"number"}
                          min={1}
                          onChange={(e) => setAsset({usdAmount: +e.target.value}) }
                   />
               </div>
               <div className={styles.assetCreator__block}>
                   <Input className={styles.assetCreator__block__field}
                          placeholder={'Введите количество токенов'}
                          type={"number"}
                          onChange={(e) => setAsset({assetAmount: +e.target.value})}
                          min={1}/>
                   <Select list={echangeList}
                           value={asset.exchange}
                           className={styles.assetCreator__block__field}
                           placeholder={'Выберите биржу'}
                           onClear={() => setAsset({exchange: ""})}
                           mapping={{key: 'id', value: 'name'}}
                           onSelect={(mapped) => {
                               setAsset({exchange: mapped.value})
                           }}
                   />
               </div>
               <div className={styles.assetCreator__block}>
                   <Select list={tagList}
                           className={styles.assetCreator__block__field}
                       // @ts-ignore
                           value={asset}
                           multiple={true}
                           placeholder={'Выберите тэги'}
                           onClear={() => setAsset({tags: []})}
                           mapping={{key: 'name', value: 'name'}}
                           onSelect={(mapped) => {
                               setAsset({tags: mapped.map(i => i.value)})
                           }}
                   />
               </div>
           </form>
            <Button className={styles.assetCreator__createBtn} onClick={onCreate}>
                Create asset
            </Button>
        </div>
    )
}
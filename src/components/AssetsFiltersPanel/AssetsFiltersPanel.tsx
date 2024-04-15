import * as React from 'react'
import styles from './AssetsFiltersPanelStyles.module.sass';
import {Input} from "../utils/input/Input";
import {useSelector} from "../../redux/store";
import {Select} from "../utils/select/Select";
import {ChainList} from "../../mock";
import {useSetState} from "react-use";
import {AssetFilters} from "../../pages/Assets/types";
import {Range} from "../utils/input/Range";
import {FormItem} from "../utils/formItem/FormItem";
export const AssetsFiltersPanel = () => {
    const assetsList = useSelector((state) => state.assets);
    const [fields, setFields] = useSetState<AssetFilters>({
        assetName: "",
        chainName: "",
        creationDate: new Date(),
        maxUsd: 0,
        minUsd: 0
    })
    const getMaxUsdAmount = () => {
        let max = 0;

        assetsList.list.forEach(i => {
            if(i.usdAmount > max){
                max = i.usdAmount
            }
        })
        return max
    }

    return (
        <div className={styles.filters}>
            <div>
                <FormItem label={'Usd range'} className={styles.filters__range}>
                    <Input type={'number'} min={0} max={getMaxUsdAmount()} placeholder={'Min usd'}/>
                    <Input type={'number'} min={0} max={getMaxUsdAmount()} placeholder={'Max usd'}/>
                </FormItem>
                <FormItem label={'Asset name'}>
                    <Select list={assetsList.list.map(i => ({key: i.name, value: i.name}))}
                            value={fields.chainName}
                            placeholder={'Enter asset name'}
                            onSelect={(v) => setFields({assetName: v.value})}/>
                </FormItem>
                <FormItem label={'By chain'}>
                    <Select list={ChainList}
                            value={fields.chainName}
                            placeholder={'Please select chain'}
                            onSelect={(v) => setFields({chainName: v.value})}/>
                </FormItem>
            </div>
        </div>
    )
}
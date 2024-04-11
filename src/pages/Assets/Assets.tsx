import * as React from 'react';
import {FC, useState} from "react";
import {ReactComponent as PlusIcon} from '../../static/svg/plus.svg';
import {ReactComponent as SelectIcon} from '../../static/svg/folder-tree.svg';
import styles from './AssetsStyles.module.sass';
import {Tag} from "../../components/utils/tag/Tag";
import {Asset} from "../../components/Asset/Asset";
import {useCustomSelector} from "../../redux/store";
import {createAssetDrawerCall} from "./root";
import {AssetCreator} from "../../components/AssetCreator/AssetCreator";
import {Button} from "../../components/utils/button/Button";
import {useDispatch} from "react-redux";
import {deleteAssetsReducer} from "../../redux/assets/assetsSlice";
import {Input} from "../../components/utils/input/Input";

export const Assets: FC = () => {
    const dispatch = useDispatch();
    const [selectMode, setSelectMode] = useState(false);
    const [assetsToRemove, setAssetsToRemove] = useState<string[]>([])
    const assets = useCustomSelector('assets');

    createAssetDrawerCall.useIt();

    const onDeselectAll = () => {
        setAssetsToRemove([]);
        setSelectMode(false);
    }

    const onDeleteAssets = () => {
        dispatch(deleteAssetsReducer(assetsToRemove));
    }

    return (
        <div className={styles.assets}>
            <div className={styles.assets__info}>
                <div className={styles.assets__info__detail}>
                    <h3 className={styles.assets__info__detail__title}>Информация о аккаунте</h3>
                    <div className={styles.assets__info__detail__item}>
                        <p className={styles.assets__info__detail__item__label}>
                           Имя пользователя:
                        </p>
                        <p className={styles.assets__info__detail__item__value}>Илья Торманов</p>
                    </div>
                    <div className={styles.assets__info__detail__item}>
                        <p className={styles.assets__info__detail__item__label}>
                            Баланс:
                        </p>
                        <p className={styles.assets__info__detail__item__value}> 20 (SOL)</p>
                    </div>
                    <div className={styles.assets__info__detail__item}>
                        <p className={styles.assets__info__detail__item__label}>
                            Дата создания профиля:
                        </p>
                        <p className={styles.assets__info__detail__item__value}>18.02.2024</p>
                    </div>
                    <div className={styles.assets__info__detail__item}>
                        <p className={styles.assets__info__detail__item__label}>
                            Тэги:
                        </p>
                        <div className={styles.assets__info__detail__item__value}>
                            <Tag text={'Активный трейдер'}/>
                            <Tag text={'Спекулянт'}/>
                            <Tag text={'Рык бынка'}/>
                        </div>
                    </div>
                </div>
                <div className={styles.assets__info__detail}>
                    <h3 className={styles.assets__info__detail__title}>Активности</h3>
                    <div className={styles.assets__info__detail__item}>
                        <p className={styles.assets__info__detail__item__label}>
                            Топ любимых токенов:
                        </p>
                        <p className={styles.assets__info__detail__item__value}>MEME, PEPE, SOL</p>
                    </div>
                    <div className={styles.assets__info__detail__item}>
                        <p className={styles.assets__info__detail__item__label}>
                            Наиболее активный период:
                        </p>
                        <p className={styles.assets__info__detail__item__value}>
                            19.03.2024 - 28.03.2024
                        </p>
                    </div>
                </div>
                <div className={styles.assets__info__detail}>
                    <h3 className={styles.assets__info__detail__title}>Cоц сети и проекты</h3>
                    <a href={'/'}>Twitch</a>
                    <a href={'/'}>Trader.org</a>
                    <a href={'/'}>Linkedin</a>
                </div>
            </div>
            <div className={styles.assets__filtersPanel}>
               <div className={styles.assets__filtersPanel__actions}>
                   <div className={styles.assets__filtersPanel__action} onClick={() => createAssetDrawerCall.showImmediately({title: 'Create new asset'})}>
                       <PlusIcon/>
                       <p>Добавить ассет</p>
                   </div>
                   <div className={styles.assets__filtersPanel__action} onClick={() => setSelectMode(true)}>
                       <SelectIcon/>
                       <p>Выбрать ассеты</p>
                   </div>
               </div>
                {selectMode && <div className={styles.assets__filtersPanel__actionsWhenSelected}>
                    <Button variant={'secondary'} color={'red'} onClick={onDeleteAssets}>
                        Удалить ассеты
                    </Button>
                    <Button variant={'secondary'} color={'main'} onClick={onDeselectAll}>
                        Отменить
                    </Button>
                </div>}
            </div>
            {assets.list.length ?
                <div className={styles.assets__list}>
                    {assets.list.map(asset => <Asset {...asset}
                                                setAssetsToRemove={setAssetsToRemove}
                                                isMarked={assetsToRemove.includes(asset.name)}
                                                isSelectMode={selectMode}
                                                key={asset.name}/>)}
                </div>
                : null
            }
        </div>
    )
}
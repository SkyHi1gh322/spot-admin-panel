import * as React from 'react';
import {FC, useState} from "react";
import {AssetCreator} from "../../components/AssetCreator/AssetCreator";
import PlusIcon from 'mdi-react/PlusIcon';
import TrashIcon from 'mdi-react/TrashCanIcon';
import EditIcon from 'mdi-react/PencilOutlineIcon';
import styles from './AssetsStyles.module.sass';
import {Tag} from "../../components/utils/tag/Tag";
import {AssetI} from "./types";
import {Asset} from "../../components/Asset/Asset";
export const Assets: FC = () => {
    const [isAssetCreatorOpen, setIsAssetCreatorOpen] = useState(false);
    const [assets, setAssets] = useState<AssetI[]>([]);

    return (
        <div className={styles.assets}>
           <div className={styles.assets__filtersPanel}>
               <div className={styles.assets__filtersPanel__action} onClick={() => setIsAssetCreatorOpen(true)}>
                   <p>Добавить ассет</p>
                   <PlusIcon onClick={() => setIsAssetCreatorOpen(true)}/>
               </div>
               <div className={styles.assets__filtersPanel__action} onClick={() => setIsAssetCreatorOpen(true)}>
                   <p>Редактировать ассет</p>
                   <EditIcon onClick={() => setIsAssetCreatorOpen(true)}/>
               </div>
               <div className={styles.assets__filtersPanel__action} onClick={() => setIsAssetCreatorOpen(true)}>
                   <p>Удалить ассеты</p>
                   <TrashIcon onClick={() => setIsAssetCreatorOpen(true)}/>
               </div>
           </div>
            <div className={styles.assets__info}>
                <div className={styles.assets__info__detail}>
                    <h3 className={styles.assets__info__detail__title}>Информация о аккаунте:</h3>
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
                    <h3>Активности:</h3>
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
                            19.03.2024 - 28.03-2024
                        </p>
                    </div>
                </div>
                <div className={styles.assets__info__detail}>
                    <h3>Cоц сети и проекты:</h3>
                    <a href={'/'}>Twitch</a>
                    <a href={'/'}>Trader.org</a>
                    <a href={'/'}>Linkedin</a>
                </div>
            </div>
            {isAssetCreatorOpen && <AssetCreator setAssets={setAssets}/>}
            {assets.length ?
                <div className={styles.assets__list}>
                    {assets.map(asset => <Asset {...asset}/>)}
                </div>
                : null
            }
        </div>
    )
}
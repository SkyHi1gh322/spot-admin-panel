import * as React from 'react';
import {FC} from "react";
import styles from "./TraderInfo.module.sass";
import {Tag} from "../utils/tag/Tag";


export const TraderInfo: FC = () => {
    return (
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
                        Последнее обновление:
                    </p>
                    <p className={styles.assets__info__detail__item__value}>2 дня назад</p>
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
                <h3 className={styles.assets__info__detail__title}>Детали позиций</h3>
                <div className={styles.assets__info__detail__item}>
                    <p className={styles.assets__info__detail__item__label}>
                        Инвестировано:
                    </p>
                    <p className={styles.assets__info__detail__item__value}>1300 USD</p>
                </div>
                <div className={styles.assets__info__detail__item}>
                    <p className={styles.assets__info__detail__item__label}>
                        Общий профит:
                    </p>
                    <p className={styles.assets__info__detail__item__value}>+150 USD</p>
                </div>
                <div className={styles.assets__info__detail__item}>
                    <p className={styles.assets__info__detail__item__label}>
                        ROE Percentage:
                    </p>
                    <p className={styles.assets__info__detail__item__value}>11.2%</p>
                </div>
                <div className={styles.assets__info__detail__item}>
                    <p className={styles.assets__info__detail__item__label}>
                        Изменение за 24 часа:
                    </p>
                    <p className={styles.assets__info__detail__item__value}>+3%</p>
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
    )
}
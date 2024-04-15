import * as React from 'react'
import {FC, useMemo, useState} from "react";
import styles from './ChartStyles.module.sass';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,

} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';


const options = {
    responsive: true,
    scales: {
        y: {
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

enum FilterEnum {
    DAY = 'DAY',
    WEEK = 'WEEK',
    MONTH = 'MONTH',
    YEAR = 'YEAR',
    ALL = 'ALL'
}

export const Chart: FC = () => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Filler,
    );

    const [activeFilter, setActiveFilter] = useState<FilterEnum>(FilterEnum.MONTH);

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Dataset 2',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const getActiveClass = (el: FilterEnum) => {
        return el === activeFilter ? styles.chart__filter__active : ''
    }

    return (
        <div className={styles.chart}>
            <div className={styles.chart__filter}>
                <p className={getActiveClass(FilterEnum.DAY)}>
                    24h
                </p>
                <p className={getActiveClass(FilterEnum.WEEK)}>
                    Week
                </p>
                <p className={getActiveClass(FilterEnum.MONTH)}>
                    Month
                </p>
                <p className={getActiveClass(FilterEnum.YEAR)}>
                    Year
                </p>
                <p className={getActiveClass(FilterEnum.ALL)}>
                    All
                </p>
            </div>
            <Line className={styles.chart__line} data={data} options={options}/>
        </div>
    )
}
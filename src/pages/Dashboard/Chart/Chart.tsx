import * as React from 'react'
import {FC, useMemo, useState} from "react";
import styles from './ChartStyles.module.sass';
import {format, eachDayOfInterval, lastDayOfMonth} from 'date-fns';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler, Tooltip, ChartOptions, TimeScale,

} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';
import "chartjs-adapter-moment";


enum FilterEnum {
    DAY = 'DAY',
    WEEK = 'WEEK',
    MONTH = 'MONTH',
    YEAR = 'YEAR',
    ALL = 'ALL'
}

const today = new Date();
export const Chart: FC = () => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Filler,
        Tooltip,
        TimeScale
    );

    const [activeFilter, setActiveFilter] = useState<FilterEnum>(FilterEnum.MONTH);

    const getActiveClass = (el: FilterEnum) => {
        return el === activeFilter ? styles.chart__filter__active : ''
    }

    const generateDateRange = useMemo(() => {
        const daysOfMonth = eachDayOfInterval({ start: format(today, 'yyyy-MM-01'), end: today });
        return daysOfMonth
    }, [today]);


    const data = {
        datasets: [
            {
                fill: true,
                tension: 0.2,
                label: 'Dataset 2',
                data: generateDateRange.map((v) => {
                    return {
                        x: v,
                        y: faker.datatype.number({ min: 0, max: 1000 })
                    }
                }),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                border: {
                    display: false,
                },
            },
            x: {
                border: {
                    display: false,
                },
                grid:{
                    display: false,
                    lineWidth: 0
                },
                ticks: {
                  callback: (tick: number) => {
                      if(new Date(tick).getDay() !== 6){
                          return ''
                      }
                      return format(new Date(tick), 'd MMMM')
                  }
                },
                type: "time",
                time: {
                    unit: "day"
                }
            }
        }
    };

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
            {/*// @ts-ignore*/}
            <Line className={styles.chart__line} data={data} options={options}/>
        </div>
    )
}

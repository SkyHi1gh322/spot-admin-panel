import * as React from 'react';
import {useEffect, useMemo, useRef, useState} from "react";
import styles from './SelectStyles.module.sass';
import {useClickAway} from 'react-use';
import {Tag} from "../tag/Tag";
import CloseIcon from 'mdi-react/CloseIcon';
import {clsx} from 'clsx';

type BaseMappedType = {key: string | number, value: string}

type MappedType<T> = BaseMappedType & Partial<T>

type ValueType = {
    render: React.ReactNode,
    real: string | number
} | string | string[] | number | number[] | {
    render: React.ReactNode,
    real: string | number
}[]

interface BaseProps<T>{
    list: MappedType<T>[],
    value: ValueType,
    onOpen?: () => void,
    onClear?: () => void,
    placeholder?: string,
    allowSearch?: boolean,
    onSearch?: (value: string) => void,
    className?: string,
    disabled?: boolean,
    error?: boolean,
    optionRender?: (value: MappedType<T>) => React.ReactNode
}

type MultiSelectProps<T> = BaseProps<T> & {
    multiple: true,
    onSelect: (mapped: MappedType<T>[]) => void,
}

type SelectProps<T> = BaseProps<T> & {
    multiple?: false,
    onSelect: (mapped: MappedType<T>) => void,
}

type Props<T> = MultiSelectProps<T> | SelectProps<T>

export function Select<T>(props: Props<T>){
    const [selected, setSelected] = useState<MappedType<T>[]>([]);
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useClickAway(containerRef,() => {
        setOpen(false);
    })

    useEffect(() => {
        if(open){
            props.onOpen?.();
        }
    }, [open]);

    const renderValue = useMemo(() => {
        if(Array.isArray(props.value)){
            return <div className={styles.baseSelect__value__content__multi}>
                {selected.map(i => <Tag onClick={() => onSelect(i)} key={i.key as unknown as string | number} text={i.value}/>)}
            </div>
        }
        if(typeof props.value === 'object' && !Array.isArray(props.value)){
            return props.value.render
        }
        return props.value;
    },[props.value]);

    const renderOptions = useMemo(() => {
            return props.list.map(i => {
                const getSelected = selected.findIndex(s => s.key === i.key) !== -1;
                if(props.optionRender){
                    return <div
                        className={`${styles.baseSelect__list__option} ${getSelected && styles.baseSelect__list__selectedOption }`}
                        onClick={() => onSelect(i)}
                        key={i.key as unknown as (string | number)}
                    >
                        {props.optionRender(i)}
                    </div>
                }
                return <div
                    className={`${styles.baseSelect__list__option} ${getSelected && styles.baseSelect__list__selectedOption }`}
                    onClick={() => onSelect(i)}
                    key={i.key as unknown as (string | number)}>{i.value}</div>
            })
    },[props, selected])

    const onSelect = (data: MappedType<T>) => {
        if(props.multiple){
            let arr = [...selected];
            if(arr.findIndex(i => i.key === data.key) !== -1){
                arr = arr.filter(i => i.key !== data.key);
            }
            else{
                arr.push(data)
            }

            props.onSelect(arr);
            setSelected(arr);
        }
        else{
            props.onSelect(data)
            setSelected([data]);
        }
    };

    const onClear = () => {
        props.onClear?.();
        setSelected([]);
    };

    const placeholderOrValue = useMemo(() => {
        if(Array.isArray(props.value)){
            if(props.value.length){
                return    <div className={styles.baseSelect__value__content}>
                    {renderValue}
                </div>
            }
        }
        else if(props.value){
            return    <div className={styles.baseSelect__value__content}>
                {renderValue}
            </div>
        }
        return <div className={styles.baseSelect__value__placeholder}>{props.placeholder}</div>
    }, [props.value])

    const classNames = clsx(styles.baseSelect__value, open && styles.baseSelect__valueFocus, props.disabled && styles.baseSelect__valueDisabled ,props.className, props.error && styles.baseSelect__valueWithError)
    return (
        <div ref={containerRef} className={styles.baseSelect}>
            <div className={classNames} onClick={() => setOpen(!open)}>
                {placeholderOrValue}
                {selected.length ? <div className={styles.baseSelect__value__clear} onClick={onClear}>
                    <CloseIcon/>
                </div> : null}
            </div>
            {open && <div className={styles.baseSelect__list}>{renderOptions}</div>}
        </div>
    )

}
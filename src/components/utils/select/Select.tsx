import * as React from 'react';
import {useEffect, useMemo, useRef, useState} from "react";
import styles from './SelectStyles.module.sass';
import {useClickAway} from 'react-use';
import {Tag} from "../tag/Tag";
import CloseIcon from 'mdi-react/CloseIcon';
import {clsx} from 'clsx';

type MappedType<T, A extends Record<string, any>> = {key: keyof T, value: keyof T} & A

type ValueType<T, A extends Record<string, any>> = {
    render: React.ReactNode,
    real: string | number
} | (string | number) | string[]

interface BaseProps<T, A extends Record<string, any>>{
    list: T[],
    value: ValueType<T, A>,
    onOpen?: () => void,
    mapping: MappedType<T, A>,
    onClear?: () => void,
    placeholder?: string,
    allowSearch?: boolean,
    onSearch?: (value: string) => void,
    className?: string,
    disabled?: boolean,
    error?: boolean
}

type MultiSelectProps<T, A extends Record<string, any>> = BaseProps<T, A> & {
    multiple: true,
    onSelect: (mapped: MappedType<T, A>[]) => void,
}

type SelectProps<T, A extends Record<string, any>> = BaseProps<T, A> & {
    multiple?: false,
    onSelect: (mapped: MappedType<T, A>) => void,
}

type Props<T, A extends Record<string, any>> = MultiSelectProps<T, A> | SelectProps<T,A>

export function Select<T, A extends Record<string, any>>(props: Props<T, A>){
    const [selected, setSelected] = useState<MappedType<T, A>[]>([]);
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

    const handleVisibleValue = useMemo(() => {
        if(Array.isArray(props.value)){
            return <div className={styles.baseSelect__value__content__multi}>
                {selected.map(i => <Tag onClick={() => onSelect(i)} key={i.key as unknown as string | number} text={i.value as unknown as string}/>)}
            </div>
        }
        if(typeof props.value === 'object' && !Array.isArray(props.value)){
            return props.value.render
        }
        return props.value;
    },[props.value]);


    const handleListMapping = useMemo(() => {
            const mapped: React.ReactNode[] = [];
            const map = props.mapping;
            props.list.forEach(i => {
                const value = i[map.value];
                const key = i[map.key];
                if(value && key !== undefined){

                    const typedLiteral = {
                        key: key,
                        value: value
                    } as unknown as MappedType<T, A>;

                    for(let key in map){
                       if(!typedLiteral[key]){
                           // @ts-ignore
                           typedLiteral[key] = i[map[key as unknown as keyof MappedType<T, A>]]
                       }
                    }

                    const v = i[map.value] as unknown as string;
                    const getSelected = selected.findIndex(i => i.key === key) !== -1;
                    mapped.push(
                        <div
                            className={`${styles.baseSelect__list__option} ${getSelected && styles.baseSelect__list__selectedOption }`}
                            onClick={() => onSelect(typedLiteral)}
                            key={key as unknown as string}>{v}</div>
                    )
                }
                else{
                    throw new Error('invalid key-value pair in prop "mapping"')
                }
            })
            return mapped;

    },[props, selected])

    const onSelect = (data: MappedType<T, A>) => {
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
                    {handleVisibleValue}
                </div>
            }
        }
        else if(props.value){
            return    <div className={styles.baseSelect__value__content}>
                {handleVisibleValue}
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
            {open && <div className={styles.baseSelect__list}>{handleListMapping}</div>}
        </div>
    )

}
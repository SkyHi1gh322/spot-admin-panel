import React, {ChangeEvent, useEffect, useState} from "react";
import {useSetState} from "react-use";

export type ValidationSchema<T> = {
    validateOn: 'submit' | 'change',
    fields: Selector<T>
}


type Selector<T> = {
    [K in keyof T]?: {
        value?: T[K],
        rules: Rule<T[K]>[],
        initialValue: T[K],
    }
}


type Rule<T> = (data?: T) => {
    isValid: boolean,
    errorText?: string
}


type SelectorResult<T> = {
    [K in keyof T] : {
        value: T[K],
        errors: string[],
        hasErrors: boolean
    }
}

type DtoResult<T> = T

type Value<T> = {
    [K in keyof T]? : T[K]
}

export function useValidate<T>(config: ValidationSchema<T>){

    const getInitialState = (data: Selector<T>) => {
        // @ts-ignore
        const res: SelectorResult<T> = {};

        for( let key in data){
            res[key as unknown as keyof T] = {
                value: data[key]?.value as unknown as T[keyof T],
                errors: [],
                hasErrors: false,
            }
        }
        return res as unknown as SelectorResult<T>
    }
    const [state, setState] = useSetState<SelectorResult<T>>(getInitialState(config.fields));

    const onRefreshForm = () => {
        setState(getInitialState(config.fields));
    }

    const onChange = (patch: Value<T>) => {
        for(let key in patch){
            const originalSelectorFromConfig = config.fields[key];

            if(originalSelectorFromConfig){
                const errors: string[] = []
                if(config.validateOn === 'change'){
                    originalSelectorFromConfig.rules.forEach(rule => {
                        // @ts-ignore
                        const r = rule(patch[key]);
                        if(!r.isValid && r.errorText){
                            errors.push(r.errorText);
                        }
                    })
                }
                setState({[key]: {
                    value: patch[key],
                    errors: errors,
                    hasErrors: errors.length > 0
                    }} as unknown as Partial<SelectorResult<T>>)

            }
        }
    };


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>, callback: (fields: SelectorResult<T>) => void) => {
        if (config.validateOn === 'submit') {
            for (let key in state) {
                const originalSelectorFromConfig = config.fields[key];

                if (originalSelectorFromConfig) {
                    const errors: string[] = []
                    originalSelectorFromConfig.rules.forEach(rule => {
                        // @ts-ignore
                        const r = rule(state[key].value);
                        if (!r.isValid && r.errorText) {
                            errors.push(r.errorText);
                        }
                    })
                    setState({
                        [key]: {
                            value: state[key].value,
                            errors: errors,
                            hasErrors: errors.length > 0
                        }
                    } as unknown as Partial<SelectorResult<T>>)
                }
            }
        }
        callback(state);
    }

    const isValidForm = () => {
        for( let key in state){
            if(state[key].errors.length){
                return false
            }
        }
        return true
    }

    const getBaseDto = () => {
        // @ts-ignore
        const res: DtoResult<T> = {}
        for( let key in state){
            // @ts-ignore
            res[key] = state[key].value
        }
        return res;
    }

    return {
        fields: state,
        onRefreshForm: onRefreshForm,
        onChange: onChange,
        onSubmit: onSubmit,
        isValidForm: isValidForm,
        getBaseDto: getBaseDto
    }

}
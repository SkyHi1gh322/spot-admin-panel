import {useEffect, useState} from "react";
import {useSetState} from "react-use";

export type ValidationSchema<T> = {
    validateOn: 'submit' | 'change',
    fields: Selector<T[keyof T]>[],
}



type Selector<T> = {
    fieldName: string,
    initialValue: T,
    value?: T,
    rules: Rule<T>[]
}


type Rule<T> = (data: T) => {
    isValid: boolean,
    errorText?: string
}


type SelectorResult<T> = {
    [K in keyof T] : {
        value: T,
        errors: string[]
    }
}

export function useValidate<T>(config: ValidationSchema<T>){

    const getInitialState = (data: Selector<T[keyof T]>[]) => {
        const res: Record<string, any> = {};

        data.forEach(i => {
            res[i.fieldName] = {
                value: i.value,
                errors: []
            }
        })

        return res as unknown as SelectorResult<T>
    }

    const [state, setState] = useSetState<SelectorResult<T>>(getInitialState(config.fields));

    const onRefreshForm = () => {
        setState(getInitialState(config.fields));
    }

    const onChange = (data: any) => {

    };

    const onSubmit = () => {

    }

    return {
        fields: state,
        onRefreshForm: onRefreshForm,
        onChange: onChange,
        onSubmit: onSubmit
    }

}
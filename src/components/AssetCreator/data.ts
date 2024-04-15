import {ValidationSchema} from "../../validation";
import {AssetI} from "../../pages/Assets/types";

export const tagList = [{
    key: 0,
    value: 'Долгосрок',
}, {key: 1, value: 'MeMe'}, {key: 2, value: 'Fast Money'}, {key: 3, value: 'Prob scam'}];

export const echangeList = [
    {key: 0, value: 'Binance', id: 0,},
    {key: 1, value: 'KuCoin', id: 1},
    {key: 2, value: 'BitGet', id: 2},
    {key: 3, value: 'BingX', id: 3}
]


export const CreateAssetSchema: ValidationSchema<AssetI> = {
    validateOn: 'submit',
    fields: {
        name:  {
            initialValue: '',
            rules: [
                (data) => {
                    return {
                        isValid: !!data && data.length > 3,
                        errorText: 'Минимум 3 символа'
                    }
                }
            ]
        },
        usdAmount:  {
            initialValue: 0,
            rules: [
                (data) => {
                    return {
                        isValid: !!data,
                        errorText: 'Минимум 1 USD'
                    }
                }
            ]
        },
        assetAmount:  {
            initialValue: 0,
            rules: [
                (data) => {
                    return {
                        isValid: !!data,
                        errorText: 'Минимум 1 единица'
                    }
                }
            ]
        },
        exchange:  {
            initialValue: '',
            rules: []
        },
        tags:  {
            initialValue: [],
            rules: [
                (data) => {
                    return {
                        isValid: !!data && data.length >= 2,
                        errorText: 'Минимум 2 тэга'
                    }
                }
            ]
        },
    }
}
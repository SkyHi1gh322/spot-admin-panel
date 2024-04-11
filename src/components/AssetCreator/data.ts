import {ValidationSchema} from "../../validation";
import {AssetI} from "../../pages/Assets/types";

export const tagList = [{
    name: 'Долгосрок',
}, {name: 'MeMe'}, {name: 'Fast Money'}, {name: 'Prob scam'}];

export const echangeList = [
    {name: 'Binance', id: 0,},
    {name: 'KuCoin', id: 1},
    {name: 'BitGet', id: 2},
    {name: 'BingX', id: 3}
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
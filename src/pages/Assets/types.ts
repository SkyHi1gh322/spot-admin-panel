export interface AssetI{
    name: string,
    assetAmount: number,
    usdAmount: number,
    exchange: string,
    tags: string[]
}

export enum AssetModeEnum{
    FILTERS_MODE = 'FILTERS_MODE',
    ADD_ASSET_MODE = 'ADD_ASSET_MODE',
    SELECT_MODE = 'SELECT_MODE',
    NONE = 'NONE'
}


export type AssetFilters = {
    chainName: string,
    creationDate: Date,
    maxUsd: number,
    minUsd: number
    assetName: string

}
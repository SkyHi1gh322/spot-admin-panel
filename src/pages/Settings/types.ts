export interface SettingsI{
    visibility: {
        profile: {
            showAccountInfo: boolean,
            showPositionsDetails: boolean,
            showActivities: boolean,
            showSocials: boolean
        },
        assets: {
            showAssets: boolean,
        },
        sidebar: {
            showFavouriteTraders: boolean
        }
    }
}
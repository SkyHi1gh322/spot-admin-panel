import {RoutesI} from "./types";
import {AssetsList} from "../pages/Assets/AssetsList";
import {FavouriteTraders} from "../pages/FavouriteTraders";
import {Assets} from "../pages/Assets/Assets";
import {Dashboard} from "../pages/Dashboard/Dashboard";
import {News} from "../pages/News/News";

export const ListRoutes = {

    ASSETS: {
        type: RoutesI.RouteType.PRIVATE,
        pageName: '/assets',
        component: <Assets/>,
        LIST: {
            pageName: () => '/assets/list',
            component: <AssetsList/>
        },
        ASSET: {
            pageName: (arg: string) => `/assets/list/${arg}`,
            component: <div>asset by id</div>
        },
        DASHBOARD: {
            pageName: '/assets/dashboard',
            component: <Dashboard/>
        }
    },
    FAVOURITE_TRADERS: {
        type: RoutesI.RouteType.PRIVATE,
        PAGE: {
            pageName: () => 'favouriteTraders',
            component: <FavouriteTraders/>
        }
    },
    NEWS:{
        type: RoutesI.RouteType.PUBLIC,
        pageName: '/news',
        component: <News/>
    },
    AUTH: {
        type: RoutesI.RouteType.PUBLIC,
        SIGNIN: {
            pageName: () => 'signin',
            component: <div>login</div>
        },
        SIGNUP: {
            pageName: () => 'signup',
            component: <div>registration</div>
        }
    }
}
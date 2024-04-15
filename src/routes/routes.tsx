import {RoutesI} from "./types";
import RouteType = RoutesI.RouteType;
import {AssetsList} from "../pages/Assets/AssetsList";
import {FavouriteTraders} from "../pages/FavouriteTraders";
import {Assets} from "../pages/Assets/Assets";
import {Dashboard} from "../pages/Dashboard/Dashboard";

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
        type: RoutesI.RouteType.PUBLIC,
        PAGE: {
            pageName: () => 'favouriteTraders',
            component: <FavouriteTraders/>
        }
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
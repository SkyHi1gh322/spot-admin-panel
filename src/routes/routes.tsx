import {RoutesI} from "./types";
import RouteType = RoutesI.RouteType;
import {Assets} from "../pages/Assets/Assets";
import {FavouriteTraders} from "../pages/FavouriteTraders";

export const ListRoutes = {
    ASSETS: {
        type: RoutesI.RouteType.PRIVATE,
        LIST: {
            pageName: () => 'assetsList',
            component: <Assets/>
        },
        ASSET: {
            pageName: (arg: string) => `assetsList/${arg}`,
            component: <div>asset by id</div>
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
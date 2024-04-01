import React from "react";

export namespace RoutesI{
    export type RouteNameFn = (arg?: string | number) => string
    export enum RouteType {
        PUBLIC = 'PUBLIC',
        PRIVATE = 'PRIVATE'
    }

    type NestedRoute = {
        ASSETS: {
            pageName: RouteNameFn,
            component: React.ReactNode
        }
    }

    export type Routes = {
        [K in string]: {
            type: RouteType,
        } & NestedRoute

    }


}
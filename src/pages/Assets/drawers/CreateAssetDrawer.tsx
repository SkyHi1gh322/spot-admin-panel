import * as React from 'react';
import {Drawer} from "../../../components/utils/drawer/Drawer";
import {FC} from "react";
import {BuilderFullProps} from "../../../generalTypes";
import {AssetCreator} from "../../../components/AssetCreator/AssetCreator";

export const CreateAssetDrawer: FC<BuilderFullProps> = (props) => {
    return (
        <Drawer onClose={props.onClose} title={props.title}>
            <AssetCreator onClose={props.onClose}/>
        </Drawer>
    )
}
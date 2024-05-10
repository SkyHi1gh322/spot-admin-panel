import * as React from 'react';
import {Drawer} from "../../../components/utils/drawer/Drawer";
import {FC} from "react";
import {BuilderFullProps} from "../../../generalTypes";
import {AssetCreator} from "../../../components/AssetCreator/AssetCreator";
import {useDispatch} from "react-redux";
import {setDefaultAction} from "../../../redux/assets/assetsActionsSlice";

export const CreateAssetDrawer: FC<BuilderFullProps> = (props) => {
    const dispatch = useDispatch();

    return (
        <Drawer onClose={() => {
            props.onClose();
            dispatch(setDefaultAction());
        }} title={props.title}>
            <AssetCreator onClose={props.onClose}/>
        </Drawer>
    )
}
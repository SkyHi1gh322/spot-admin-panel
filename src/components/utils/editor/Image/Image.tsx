import * as React from 'react';
import { ContentState } from "draft-js";
import {FC} from "react";
import {useEditorApi} from "../context";

type LinkProps = {
    contentState: ContentState;
    entityKey: string;
};
export const Image: FC<LinkProps> = ({ contentState, entityKey }) => {
    const { src } = contentState.getEntity(entityKey).getData();
    return (
       <img src={src}/>
    );
}
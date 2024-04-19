import * as React from 'react'
import {FC} from "react";


interface Props{
    children: React.ReactNode;
}
export const ContextMenu: FC<Props> = (props) => {
    return (
        <div style={{background: 'red'}}>
            {props.children}
        </div>
    )
}
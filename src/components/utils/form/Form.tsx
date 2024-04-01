import * as React from 'react';
import {FC} from "react";

interface FormProps<T extends Record<string, string>>{
    children: (data: T) => React.ReactNode,
    className?: string,
}

export function Form<T extends Record<string, string>>(props: FormProps<T>){
    return (
        <form>
            {/*// @ts-ignore*/}
            {props.children({})}
        </form>
    )
}

interface FormItemProps{

}
export const Item: FC<FormItemProps> = (props) => {
    return (
        <div>

        </div>
    )
}
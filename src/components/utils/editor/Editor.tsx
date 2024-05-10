import * as React from "react";
import {FC, useEffect, useRef, useState} from "react";
import {EditorState} from "prosemirror-state";
import {schema} from "prosemirror-schema-basic";
import {headerPlaceholder, paragraphPlaceholder} from "./plugins";
import {keymap} from "prosemirror-keymap";
import {baseKeymap} from "prosemirror-commands";
import {ProseMirror, react, useNodeViews} from "@nytimes/react-prosemirror";
import {EditorActions} from "./EditorActions";
import {DOMSerializer, Schema} from "prosemirror-model";
import {useSelector} from "../../../redux/store";
import {exampleSetup} from "prosemirror-example-setup"
export const Editor: FC = () => {
    const articleRef = useRef<HTMLDivElement | null>(null);
    const [mount, setMount] = useState<HTMLElement | null>(null);
    const newsList = useSelector(state => state.news);

    const [state, setState] = useState(EditorState.create({ schema, plugins: [
            headerPlaceholder(),
            paragraphPlaceholder(),
            keymap(baseKeymap),
        ] }));


    useEffect(() => {
        if(newsList.length){
            const data = DOMSerializer.fromSchema(state.schema).serializeFragment(state.doc.content);
            articleRef.current?.prepend(data);
        }
    }, [newsList]);

    return (
        <div>
            <ProseMirror mount={mount} state={state} dispatchTransaction={(tr) => {
                setState((s) => s.apply(tr));
            }}>
                {/*<EditorActions currentState={state}/>*/}
                <div ref={setMount} />
            </ProseMirror>
            <div ref={articleRef}>

            </div>
        </div>
    );
}
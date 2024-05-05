import * as React from 'react';
import {CSSProperties, FC, useRef, useState} from "react";
import {EditorState} from "prosemirror-state"
import {schema} from "prosemirror-schema-basic"
import './PM.css';
import {ProseMirror, useEditorEffect} from "@nytimes/react-prosemirror";
import { useEditorEventCallback } from "@nytimes/react-prosemirror";
import {EditorActions} from "../../components/utils/editor/EditorActions";
import {baseKeymap} from "prosemirror-commands"
import {keymap} from "prosemirror-keymap"
import {headerPlaceholder, paragraphPlaceholder} from "../../components/utils/editor/plugins";

export const News: FC = () => {
    const [mount, setMount] = useState<HTMLElement | null>(null);
    const [state, setState] = useState(EditorState.create({ schema, plugins: [
        headerPlaceholder(),
        paragraphPlaceholder(),
        keymap(baseKeymap),
        ] }));

    return (
        <ProseMirror mount={mount} state={state} dispatchTransaction={(tr) => {
            setState((s) => s.apply(tr));
        }}>
            <EditorActions/>
            <div ref={setMount} />
        </ProseMirror>
    );
}

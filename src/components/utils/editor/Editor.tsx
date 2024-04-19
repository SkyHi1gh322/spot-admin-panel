import * as React from "react";
import {FC} from "react";
import Editor, { composeDecorators } from "@draft-js-plugins/editor";
import createImagePlugin from "@draft-js-plugins/image";
import 'draft-js/dist/Draft.css';
import styles from './EditorStyles.module.sass';
import {BLOCK_RENDER_MAP, BlockType, CUSTOM_STYLE_MAP, InlineStyle} from "./config";
import './BaseEditorStylesOverride.sass';
import {useEditorApi} from "./context";
import clsx from 'clsx';
const imagePlugin = createImagePlugin();
const plugins = [imagePlugin];

export const TextEditor: FC = () => {
    const editorApi = useEditorApi();
    const activeClassName = (data: BlockType) => clsx(styles.editor__panel__item, editorApi.currentBlockType === data && styles.editor__panel__itemActive);

    return (
        <div className={styles.editor}>
            <div className={styles.editor__panel}>
                <p onClick={() => editorApi.toggleBlockType(BlockType.h1)} className={activeClassName(BlockType.h1)}>
                  Title
                </p>
                <p onClick={() => editorApi.toggleBlockType(BlockType.h2)} className={activeClassName(BlockType.h2)}>
                    Subtitle
                </p>
                <p onClick={() => editorApi.toggleBlockType(BlockType.cite)} className={activeClassName(BlockType.cite)}>
                    Cite
                </p>
                <p onClick={() => editorApi.toggleBlockType(BlockType.default)} className={activeClassName(BlockType.default)}>
                    Default
                </p>
                <p onClick={() => editorApi.toggleBlockType(BlockType.h1)} className={activeClassName(BlockType.h1)}>
                    Title
                </p>
                {Object.values(InlineStyle).map(v =>
                <p key={v} onClick={() => editorApi.toggleInlineStyle(v)}>
                    {v}
                </p>
                )}
                <p onClick={() => {
                    const url = prompt("URL:");
                    if (url) {
                        editorApi.addLink(url);
                    }
                }}>
                    Link
                </p>
            </div>
            <Editor
                spellCheck
                handleKeyCommand={editorApi.handleKeyCommand}
                customStyleMap={CUSTOM_STYLE_MAP}
                blockRenderMap={BLOCK_RENDER_MAP}
                editorState={editorApi.state}
                // @ts-ignore
                handlePastedFiles={(e) => {
                    const reader = new FileReader();
                    const file = e[0];
                    reader.addEventListener(
                        "load",
                        () => {
                            const base64 = 'data:image/png;base64,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';
                            editorApi.onChange(editorApi.insertImage(base64 as unknown as string))
                        },
                        false,
                    );

                    if (file) {
                        reader.readAsDataURL(file);
                    }
                }}
                onChange={editorApi.onChange}
                plugins={plugins}
                placeholder={'Введите текст'}
                keyBindingFn={editorApi.handlerKeyBinding}
            />
        </div>
    )
}
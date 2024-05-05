import * as React from 'react';
import {useEditorEffect, useEditorEventCallback} from "@nytimes/react-prosemirror";
import {useState} from "react";
import {LinkCreator} from "./LinkCreator";
import styles from './EditorActionsStyles.module.sass';
export const EditorActions = () => {
    const [creationType, setCreationType] = useState('none')

    const onAddCode = useEditorEventCallback((view) => {
        const {$from, $to} = view.state.selection
        const empty = view.state.schema.nodes.code_block.createAndFill()
        const endOfBlock = $from.end()
        if (empty) {
            const tr = view.state.tr.insert(endOfBlock + 1, empty);
            view.dispatch(tr)
        }
    });
    const onAddBlockQuote = useEditorEventCallback((view) => {
        const {$from, $to} = view.state.selection
        const empty = view.state.schema.nodes.blockquote.createAndFill()
        const endOfBlock = $from.end()
        if (empty) {
            const tr = view.state.tr.insert(endOfBlock + 1, empty)
            view.dispatch(tr)
        }
    });

    const onAddHeading = useEditorEventCallback((view) => {
        const {$from, $to} = view.state.selection
        const empty = view.state.schema.nodes.heading.createAndFill()
        const endOfBlock = $from.end()
        if (empty) {
            const tr = view.state.tr.insert(endOfBlock + 1, empty)
            view.dispatch(tr)
        }
    });

    return (
        <div className={styles.actions}>
            {creationType === 'link' && <LinkCreator/>}
            <div className={styles.action} onClick={() => setCreationType('link')}>Link</div>
            <div className={styles.action}>Paragraph</div>
            <div className={styles.action} onClick={() => {
                setCreationType('code_block');
                onAddCode();
            }}>
                Code
            </div>
            <div className={styles.action} onClick={() => {
                setCreationType('blockquote');
                onAddBlockQuote();
            }}>
                Quote
            </div>
            <div className={styles.action} onClick={() => {
                setCreationType('heading');
                onAddHeading();
            }}>
                Heading
            </div>
        </div>
    )
}
import * as React from 'react';
import {useEditorEventCallback} from "@nytimes/react-prosemirror";
import {ChangeEvent, ChangeEventHandler, FC, useState} from "react";
import {LinkCreator} from "./LinkCreator";
import styles from './EditorActionsStyles.module.sass';
import {Button} from "../button/Button";
import {EditorState} from "prosemirror-state";
import {useDispatch} from "react-redux";
import {createNew} from "../../../redux/news/newsSlice";
import {ReactComponent as HeadingIcon} from "../../../static/svg/h1.svg";
import {ReactComponent as LinkIcon} from "../../../static/svg/link-alt.svg";
import {ReactComponent as ImageIcon} from "../../../static/svg/add-image.svg";
import {ReactComponent as CodeIcon} from "../../../static/svg/code-simple.svg";
import {ReactComponent as ParagraphIcon} from "../../../static/svg/paragraph.svg";
import {ReactComponent as QuoteIcon} from "../../../static/svg/quote-right.svg";
import img from '../../../static/binance.png'
interface Props{
    currentState: EditorState,
}

type UnionCreationType = 'heading' | 'paragraph' | 'blockquote' | 'code' | 'image' | 'link' | 'none'

export const EditorActions: FC<Props> = (props) => {
    const dispatch = useDispatch();
    const [creationType, setCreationType] = useState<UnionCreationType>('none');

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

    function getHTMLStringFromState () {
        dispatch(createNew(props.currentState))
    }
    const actionClassNames = (currentType: UnionCreationType) => {
        return `${styles.action} ${currentType === creationType ? styles.action_active: ''}`
    }
    const onAddFile = (e: ChangeEvent<HTMLInputElement>) => {
        const empty = props.currentState.schema.nodes.image.create({src: img});

        if (empty) {
            const tr = props.currentState.tr.replaceSelectionWith(empty);
            props.currentState.apply(tr);
        }
    }

    return (
        <div className={styles.actions}>
            <div className={styles.actions__left}>
                {creationType === 'link' && <LinkCreator/>}
                <HeadingIcon title={'Heading'}
                             className={actionClassNames('heading')}
                             onClick={() => {
                    setCreationType('heading');
                    onAddHeading();
                }}/>
                <ParagraphIcon title={'Paragraph'}
                               className={actionClassNames('paragraph')}/>
                <LinkIcon title={'Link'}
                          className={actionClassNames('link')}
                          onClick={() => setCreationType('link')}/>
                <CodeIcon title={'Code'}
                          className={actionClassNames('code')}
                          onClick={() => {
                    setCreationType('code');
                    onAddCode();
                }}/>
                <QuoteIcon title={'Quote'}
                           className={actionClassNames('blockquote')}
                           onClick={() => {
                    setCreationType('blockquote');
                    onAddBlockQuote();
                }}/>
                <div>
                    <input type={"file"} onChange={e => onAddFile(e)}/>
                    <ImageIcon title={'Image'}
                               className={actionClassNames('image')}
                               onClick={() => {
                                   setCreationType('image');
                                   onAddHeading();
                               }}/>
                </div>
            </div>
            <div className={styles.actions__right}>
                <Button variant={'secondary'} color={'red'} onClick={() => getHTMLStringFromState()}>
                    Clear data
                </Button>
                <Button variant={'secondary'} color={'main'} onClick={() => getHTMLStringFromState()}>
                    Publish article
                </Button>
            </div>
        </div>
    )
}
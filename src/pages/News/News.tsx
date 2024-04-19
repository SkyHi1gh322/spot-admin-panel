import * as React from 'react';
import {FC} from "react";
import { TextEditorProvider } from '../../components/utils/editor/context';
import {TextEditor} from "../../components/utils/editor/Editor";
import styles from './NewsStyles.module.sass';
export const News: FC = () => {

    return (
        <TextEditorProvider>
            <div className={styles.news}>
                <TextEditor/>
            </div>
        </TextEditorProvider>
    )
}
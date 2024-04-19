import * as React from "react";
import { EditorApi, useEditor } from "./useEditor";

const TextEditorContext = React.createContext<EditorApi | undefined>(undefined);

interface Props{
    children: React.ReactNode
}
export const TextEditorProvider: React.FC<Props> = (props) => {
    const editorApi = useEditor();

    return (
        <TextEditorContext.Provider value={editorApi}>
            {props.children}
        </TextEditorContext.Provider>
    );
};

export const useEditorApi = () => {
    const context = React.useContext(TextEditorContext);
    if (context === undefined) {
        throw new Error("useEditorApi must be used within TextEditorProvider");
    }

    return context;
};
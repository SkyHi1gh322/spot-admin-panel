import Draft, {
    KeyBindingUtil,
    getDefaultKeyBinding,
    DraftHandleValue,
    CompositeDecorator,
    DraftEntityMutability,
    EditorState,
    RichUtils, AtomicBlockUtils,
} from "draft-js";
import * as React from "react";
import { BlockType, EntityType, InlineStyle, KeyCommand } from "./config";
import { HTMLtoState, stateToHTML } from "./convert";
import Link from "./Link";
import ContextMenuDecorator from "./ContextMenuDecorator";
import ImageDecorator from "./Image";

export type EditorApi = {
    state: EditorState;
    onChange: (state: EditorState) => void;
    toggleBlockType: (blockType: BlockType) => void;
    currentBlockType: BlockType;
    toHtml: () => string;
    toggleInlineStyle: (inlineStyle: InlineStyle) => void;
    hasInlineStyle: (inlineStyle: InlineStyle) => boolean;
    addLink: (url: string) => void;
    setEntityData: (entityKey: string, data: Record<string, string>) => void;
    insertImage: (url: string) => Draft.EditorState
    handleKeyCommand: (
        command: KeyCommand,
        editorState: EditorState
    ) => DraftHandleValue;
    handlerKeyBinding: (e: React.KeyboardEvent) => KeyCommand | null;
};

const decorator = new CompositeDecorator([Link, ContextMenuDecorator, ImageDecorator]);

export const useEditor = (html?: string): EditorApi => {
    const [state, setState] = React.useState(() =>
        html
            ? EditorState.createWithContent(HTMLtoState(html), decorator)
            : EditorState.createEmpty()
    );

    const toggleBlockType = React.useCallback((blockType: BlockType) => {
        setState((currentState) =>
            RichUtils.toggleBlockType(currentState, blockType)
        );
    }, []);

    const currentBlockType = React.useMemo(() => {
        const selection = state.getSelection();
        const content = state.getCurrentContent();
        const block = content.getBlockForKey(selection.getStartKey());
        return block.getType() as BlockType;
    }, [state]);


    const toggleInlineStyle = React.useCallback((inlineStyle: InlineStyle) => {
        setState((currentState) =>
            RichUtils.toggleInlineStyle(currentState, inlineStyle)
        );
    }, []);

    const hasInlineStyle = React.useCallback(
        (inlineStyle: InlineStyle) => {
            const currentStyle = state.getCurrentInlineStyle();
            return currentStyle.has(inlineStyle);
        },
        [state]
    );

    const setEntityData = React.useCallback((entityKey: string, data: Record<string, any>) => {
        setState((currentState) => {
            const content = currentState.getCurrentContent();
            const contentStateUpdated = content.mergeEntityData(entityKey, data);
            return EditorState.push(
                currentState,
                contentStateUpdated,
                "apply-entity"
            );
        });
    }, []);

    const addEntity = React.useCallback(
        (
            entityType: EntityType,
            data: Record<string, string>,
            mutability: DraftEntityMutability
        ) => {
            setState((currentState) => {
                const contentState = currentState.getCurrentContent();
                const contentStateWithEntity = contentState.createEntity(
                    entityType,
                    mutability,
                    data
                );
                const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
                const newState = EditorState.set(currentState, {
                    currentContent: contentStateWithEntity,
                });
                return RichUtils.toggleLink(
                    newState,
                    newState.getSelection(),
                    entityKey
                );
            });
        },
        []
    );

    const addLink = React.useCallback(
        (url: string) => {
            addEntity(EntityType.link, { url }, "MUTABLE");
        },
        [addEntity]
    );

    const handleKeyCommand = React.useCallback(
        (command: KeyCommand, editorState: EditorState) => {
            if (command === "accent") {
                toggleInlineStyle(InlineStyle.ACCENT);
                return "handled";
            }

            const newState = RichUtils.handleKeyCommand(editorState, command);

            if (newState) {
                setState(newState);
                return "handled";
            }

            return "not-handled";
        },
        [toggleInlineStyle]
    );

    const insertImage = ( url: string) => {
        const contentState = state.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
        'image',
    'IMMUTABLE',
        { src: url },)
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set( state, { currentContent: contentStateWithEntity });
        return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, '');
    };

    const handlerKeyBinding = React.useCallback((e: React.KeyboardEvent) => {
        if (e.keyCode === 81 && KeyBindingUtil.hasCommandModifier(e)) {
            return "accent";
        }

        return getDefaultKeyBinding(e);
    }, []);

    const toHtml = React.useCallback(
        () => stateToHTML(state.getCurrentContent()),
        [state]
    );

    return React.useMemo(
        () => ({
            state,
            onChange: setState,
            toggleBlockType,
            currentBlockType,
            toggleInlineStyle,
            hasInlineStyle,
            toHtml,
            addLink,
            setEntityData,
            handleKeyCommand,
            handlerKeyBinding,
            insertImage:insertImage
        }),
        [
            state,
            toggleBlockType,
            currentBlockType,
            toggleInlineStyle,
            hasInlineStyle,
            toHtml,
            addLink,
            setEntityData,
            handleKeyCommand,
            handlerKeyBinding,
        ]
    );
};
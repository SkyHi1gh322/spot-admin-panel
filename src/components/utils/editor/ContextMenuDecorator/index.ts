
import { ContentBlock, ContentState, DraftDecorator } from "draft-js";
import {ContextMenu} from "./ContextMenu";

function findContextMenuEntities(
    contentBlock: ContentBlock,
    callback: (start: number, end: number) => void,
    contentState: ContentState
): void {
    contentBlock.findEntityRanges((character) => {
        const entityKey = character.getEntity();
        return (
            entityKey !== null
        );
    }, callback);
}

const contextMenuDecorator: DraftDecorator = {
    strategy: findContextMenuEntities,
    component: ContextMenu,
};

export default contextMenuDecorator;
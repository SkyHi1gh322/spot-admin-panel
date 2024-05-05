import {Plugin, Transaction} from "prosemirror-state";
import {NodeType, Node} from "prosemirror-model";
import {Decoration, DecorationSet} from "prosemirror-view";


const isEmptyHeading = (node: Node): boolean => {
    return node.type.name === 'heading' && node.nodeSize === 2;
};

const isEmptyParagraph = (node: Node): boolean => {
    return node.type.name === 'paragraph' && node.nodeSize === 2;
};

export const headerPlaceholder = () => {
    return new Plugin({
        props: {
            decorations(state) {
                const { $from } = state.selection;
                if (isEmptyHeading($from.parent)) {
                    const decoration = Decoration.node($from.before(), $from.after(), {
                        'data-placeholder': 'Please enter a new title',
                    });
                    return DecorationSet.create(state.doc, [decoration]);
                }
            },
        },
    });
};
export const paragraphPlaceholder = () => {
    return new Plugin({
        props: {
            decorations(state) {
                const { $from } = state.selection;
                if (isEmptyParagraph($from.parent)) {
                    const decoration = Decoration.node($from.before(), $from.after(), {
                        'data-placeholder': 'Please type something...',
                    });
                    return DecorationSet.create(state.doc, [decoration]);
                }
            },
        },
    });
};
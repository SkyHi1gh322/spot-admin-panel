import {Input} from "../input/Input";
import {Button} from "../button/Button";
import * as React from "react";
import {FC} from "react";
import {useSetState} from "react-use";
import {useEditorEventCallback} from "@nytimes/react-prosemirror";
import {toggleMark} from "prosemirror-commands";

export const LinkCreator: FC = () => {

    const [linkData, setLinkData] = useSetState({href: '', title: ''})

    const onAddLink = useEditorEventCallback((view) => {
        const toggleBoldMark = toggleMark(view.state.schema.marks.link);
        toggleBoldMark(view.state, view.dispatch, view);
        let node= view.state.schema.text(linkData.title, [view.state.schema.marks.link.create(linkData)])
        view.dispatch(view.state.tr.replaceSelectionWith(node, false))
    });

    return (
      <div>
          <Input placeholder={'https:../'} value={linkData.href} onChange={e => setLinkData({href: e.target.value})} />
          <Input placeholder={'text'} value={linkData.title} onChange={e => setLinkData({title: e.target.value})} />
          <Button color={'main'} variant={'secondary'} onClick={onAddLink}>
              add link
          </Button>
      </div>
    )
}
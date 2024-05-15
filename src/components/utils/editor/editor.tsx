import "./editor.scss";

import React from "react";

import { useProseMirror } from "./core/hooks";
import { Extension } from "./core/extension";
import { CalloutExtension } from "./extensions/callout/extension";

const allExtensions: Extension[] = [new CalloutExtension()];

export const Editor = () => {
  const { ...editorProps } = useProseMirror({ extensions: allExtensions, value: null });

  return (
      <div className="editor-sandbox">
        <div {...editorProps} />
      </div>
  );
};

import React from 'react';
import MonacoEditor, { OnChange, OnMount } from '@monaco-editor/react';
interface IProps {
  onMount?: OnMount;
  onChange?: OnChange;
  defaultValue?: string;
}

const Editor = (props: IProps) => {
  const { onMount, onChange, defaultValue } = props;

  return (
    <div className="h-full">
      <MonacoEditor
        onMount={onMount}
        theme="vs-dark"
        onChange={onChange}
        defaultLanguage="markdown"
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default Editor;

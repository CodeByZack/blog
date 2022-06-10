import MonacoEditor, { OnChange, OnMount } from '@monaco-editor/react';
// import './fixEditor.css';
interface IProps {
  onMount?: OnMount;
  onChange?: OnChange;
  defaultValue?: string;
}

const KEditor = (props: IProps) => {
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

export default KEditor;
import MonacoEditor, { OnChange, OnMount } from '@monaco-editor/react';
// import './fixEditor.css';
interface IProps {
  onMount?: OnMount;
  onChange?: OnChange;
  defaultValue?: string;
  theme?: 'vs-dark' | 'light';
}

const KEditor = (props: IProps) => {
  const { onMount, onChange, defaultValue, theme = 'vs-dark' } = props;

  return (
    <div className="h-full">
      <MonacoEditor
        onMount={onMount}
        theme={theme}
        onChange={onChange}
        defaultLanguage="markdown"
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default KEditor;
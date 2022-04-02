import React, { PropsWithChildren, useEffect, useRef } from 'react';
import MonacoEditor, { OnMount } from '@monaco-editor/react';

interface IProps {
  language: string;
  code: string;
  readonly?: boolean;
  height?: React.CSSProperties['height'];
}

const CodeBlock = (props: PropsWithChildren<IProps>) => {
  const { language, code, height = 300, children, readonly } = props;
  const monacoRef = useRef<Parameters<OnMount>['0']>(null);

  const onMount: OnMount = (editor) => {
    monacoRef.current = editor;
    setTimeout(() => {
      editor.updateOptions({ readOnly: readonly, minimap: { enabled: false } });
    }, 0);
  };

  useEffect(() => {
    if (monacoRef.current) {
      monacoRef.current.updateOptions({ readOnly: readonly });
    }
  }, [readonly]);

  useEffect(() => {
    if (monacoRef.current) {
      monacoRef.current.setValue((children as string) || code);
    }
  }, [children, code]);

  return (
    <div style={{ height }}>
      <MonacoEditor
        onMount={onMount}
        theme="vs-dark"
        defaultLanguage={language}
        defaultValue={(children as string) || code}
      />
    </div>
  );
};
export default CodeBlock;

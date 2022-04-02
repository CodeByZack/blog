import React, { PropsWithChildren, useEffect, useRef } from 'react';
import MonacoEditor, { OnMount, Monaco } from '@monaco-editor/react';

interface IProps {
  language: string;
  code: string;
  readonly?: boolean;
  // disableScroll?: boolean;
  height?: React.CSSProperties['height'];
}

const CodeBlock = (props: PropsWithChildren<IProps>) => {
  const {
    language,
    code,
    height = 300,
    children,
    readonly
    // disableScroll
  } = props;
  const editorRef = useRef<Parameters<OnMount>['0']>(null);
  const monacoRef = useRef<Monaco>(null);

  const onMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    editor.updateOptions({ readOnly: readonly });
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.updateOptions({
        readOnly: readonly
        // scrollbar: { vertical: scroll ? 'auto' : 'hidden' }
      });
    }
  }, [readonly]);

  // useEffect(() => {
  //   if (editorRef.current && disableScroll) {
  //     editorRef.current.updateOptions({
  //       overviewRulerLanes: 0,
  //       scrollbar: {
  //         vertical: 'hidden',
  //         horizontal: 'hidden',
  //         handleMouseWheel: false
  //       },
  //       wordWrap: 'on'
  //     });
  //   }
  // }, [disableScroll]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setValue((children as string) || code);
    }
  }, [children, code]);

  useEffect(() => {
    if (monacoRef.current) {
      monacoRef.current.editor.setModelLanguage(
        editorRef.current.getModel(),
        language
      );
    }
  }, [language]);

  return (
    <div style={{ height }}>
      <MonacoEditor
        onMount={onMount}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          renderFinalNewline: false,
          lineNumbers: 'off'
        }}
        defaultLanguage={language}
        defaultValue={(children as string) || code}
      />
    </div>
  );
};
export default CodeBlock;

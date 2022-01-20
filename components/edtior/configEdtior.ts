import { Monaco } from '@monaco-editor/react';

const imageComp = `<Image
  alt={'virtual-dom-babel'}
  src={'/static/images/build-your-owen-react/virtual-dom-babel.png'}
  width={400}
  height={170}
/>`;

export const registerAutoCompletion = (monaco: Monaco) => {
  monaco.languages.registerCompletionItemProvider('markdown', {
    provideCompletionItems: (model, position) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn
      };
      const result = [
        {
          label: 'image',
          kind: monaco.languages.CompletionItemKind.Function,
          documentation: 'insert Image Comp',
          insertText: imageComp,
          range: range
        }
      ];
      return {
        suggestions: result
      };
    }
  });
};

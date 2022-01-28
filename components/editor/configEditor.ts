import { Monaco } from '@monaco-editor/react';

const imageComp = `<Image
  alt={'virtual-dom-babel'}
  src={'/static/images/build-your-owen-react/virtual-dom-babel.png'}
  width={400}
  height={170}
/>`;

const markdownSnippet = [
  {
    label: 'inline-code',
    insertText: '`$1`',
    desc: '行内代码'
  },
  {
    label: 'block-code',
    insertText: '```$1```',
    desc: '代码块'
  },
  {
    label: 'italic',
    insertText: '*$1*',
    desc: '斜体文字'
  },
  {
    label: 'bold',
    insertText: '**$1**',
    desc: '粗体文字'
  },
  {
    label: 'bold-italic',
    insertText: '***$1***',
    desc: '粗体斜体文字'
  },
  {
    label: 'insert-image',
    insertText: '![$1]($2)',
    desc: '插入图片'
  },
  {
    label: 'insert-link',
    insertText: '[$1]($2)',
    desc: '插入链接'
  }
];

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
          kind: monaco.languages.CompletionItemKind.Text,
          documentation: 'insert Image Comp',
          insertText: imageComp,
          range: range
        },
        ...markdownSnippet.map((item) => {
          return {
            label: item.label,
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: item.desc,
            insertText: item.insertText,
            range: range
          };
        })
      ];
      return {
        suggestions: result
      };
    }
  });
};

import { useRef } from 'react';
import { KPreview } from 'ui';

const Demo = () => {
  const ref = useRef<HTMLIFrameElement>();

  const init = () => {
    console.log(ref.current.contentWindow);
    ref.current.contentWindow.postMessage(
      {
        css: 'body{ background: red }',
        html: '<div>hello init preview !!!</div>',
      },
      '*',
    );
  };

  return (
    <div>
      <KPreview
        ref={ref}
        onLoad={() => {
          console.log('onload');
          init();
        }}
      />
      <button onClick={()=>{ init() }}>click</button>
    </div>
  );
};

export default Demo;

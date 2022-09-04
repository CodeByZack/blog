import { forwardRef, useEffect, useRef } from 'react';
import clsx from 'clsx';
//@ts-ignore
import srcdoc from '!!raw-loader!./srcdoc.html';

interface IProps {
  onLoad?: () => void;
  iframeClassName?: string;
  resizing?: boolean;
}

const KPreview = forwardRef<HTMLIFrameElement, IProps>(
  ({ onLoad, iframeClassName = '', resizing }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
      <div className="w-full h-full" ref={containerRef}>
        <iframe
          ref={ref}
          title="Preview"
          onLoad={onLoad}
          className={clsx(iframeClassName, 'w-full h-full bg-white', {
            'pointer-events-none select-none': resizing,
          })}
          srcDoc={srcdoc}
        />
      </div>
    );
  },
);

export default KPreview;

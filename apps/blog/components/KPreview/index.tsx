import { forwardRef, useRef } from 'react';
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

    const cn = `${iframeClassName} w-full h-full ${
      resizing ? 'pointer-events-none select-none' : ''
    }`;

    return (
      <div className="w-full h-full" ref={containerRef}>
        <iframe
          ref={ref}
          title="Preview"
          onLoad={onLoad}
          className={cn}
          srcDoc={srcdoc}
        />
      </div>
    );
  },
);

KPreview.displayName = 'KPreview';
export default KPreview;

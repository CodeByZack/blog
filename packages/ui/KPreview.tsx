import { useMemo } from 'react';
import { createHtml, IHtmlSource } from 'utils';
interface IProps extends IHtmlSource {
  /** 完整的html文本 直接赋值给iframe */
  srcDoc: string;
}

const getSrcDoc = (params: IProps) => {
  const { srcDoc, mdxStr, cssStr, scripts, cssLinks } = params;
  if (srcDoc) return srcDoc;

  const resultStr = createHtml({
    mdxStr,
    cssLinks,
    cssStr,
    scripts,
  });
  return resultStr;
};

const KPreview = (props: IProps) => {
  const { srcDoc, mdxStr, cssStr, scripts, cssLinks } = props;

  const realSrcDoc = useMemo(() => {
    return getSrcDoc(props);
  }, [srcDoc, mdxStr, cssStr, scripts, cssLinks]);

  return (
    <div style={{ height: '100%' }}>
      <iframe
        width="100%"
        height="100%"
        className="iframe"
        srcDoc={realSrcDoc}
      />
    </div>
  );
};

export default KPreview;
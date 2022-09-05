import { useToasts } from '@geist-ui/core';
import { MediaManage } from 'media-manage';

const Demo = () => {
  const { setToast } = useToasts({ placement: 'topRight' });

  const showToast = (msg: string) => {
    setToast({
      text: msg,
    });
  };

  return (
    <div>
      <MediaManage showToast={showToast} />
    </div>
  );
};

export default Demo;

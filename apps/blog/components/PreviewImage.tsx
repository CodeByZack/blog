import { GeistProvider, Modal, Image } from '@geist-ui/core';
import React from 'react';
import { ConfirmHOC, makeImperative } from './ReactImperative';
import { IInjectProps } from './ReactImperative/confirm-wrapper';

interface IProps extends IInjectProps {}

const ImagePreview = (props: IProps) => {
  const { show, dismiss, proceed } = props;

  return (
    <GeistProvider themeType="dark">
      <Modal wrapClassName="w-80vw" visible={show} onClose={dismiss}>
        <Image
          alt="http://www.deelay.me/2000/https://geist-ui.dev/images/geist-banner.png"
          width="80vw"
          height="70vh"
          src="http://www.deelay.me/2000/https://geist-ui.dev/images/geist-banner.png"
        />
      </Modal>
    </GeistProvider>
  );
};

const ConfirmAble = ConfirmHOC(ImagePreview);
const previewImages = makeImperative(ConfirmAble);

export default previewImages;

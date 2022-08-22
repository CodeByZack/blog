/* eslint-disable @next/next/no-img-element */
import { GeistProvider, Modal, Image } from '@geist-ui/core';
import React from 'react';
import { ConfirmHOC, makeImperative } from './ReactImperative';
import { IInjectProps } from './ReactImperative/confirm-wrapper';

interface IProps extends IInjectProps {
  urls: string[];
}

const ImagePreview = (props: IProps) => {
  const { show, dismiss, proceed, urls } = props;

  return (
    <div
      className={`${
        show ? 'block' : 'hidden'
      } fixed top-0 left-0 w-screen h-screen z-10`}
    >
      <div className="absolute top-0 left-0 h-full w-full bg-black"></div>
      <div
        onClick={dismiss}
        className="absolute w-full h-full flex items-center justify-center"
      >
        <img
          className="w-[80vw] h-[70vh]"
          alt={urls[0]}
          width="100%"
          height="100%"
          src={urls[0]}
        />
      </div>
    </div>
  );
};

const ConfirmAble = ConfirmHOC(ImagePreview);
const previewImages = makeImperative(ConfirmAble);

export default previewImages;

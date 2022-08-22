/* eslint-disable @next/next/no-img-element */
import React, { useLayoutEffect, useState } from 'react';
import { ConfirmHOC, makeImperative } from './ReactImperative';
import { IInjectProps } from './ReactImperative/confirm-wrapper';
import anime from 'animejs/lib/anime.es.js';
import { useRef } from 'react';

interface IProps extends IInjectProps {
  urls: string[];
  dom: HTMLImageElement;
}

const ImagePreview = (props: IProps) => {
  const { show, dismiss, proceed, urls, dom } = props;
  const [style, setStyle] = useState<React.CSSProperties>({});
  const ref = useRef<HTMLDivElement>();

  useLayoutEffect(() => {
    if (dom && show) {
      const rect = dom.getBoundingClientRect();
      const { x, y, width, height } = rect;
      setStyle({ top: y, left: x, width, height });
      requestAnimationFrame(() => {
        setStyle({
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '80vw',
          height: '70vh',
        });
      });
    }
  }, [dom, show]);

  const hide = () => {
    if (dom) {
      const rect = dom.getBoundingClientRect();
      const { x, y, width, height } = rect;
      setStyle({ top: y, left: x, width, height });
      ref.current.ontransitionend = () => {
        console.log(" ontransitionend ")
        dismiss();
        ref.current.ontransitionend = null;
      };
    } else {
      dismiss();
    }
  };

  return (
    <div
      className={`${
        show ? 'block' : 'hidden'
      } fixed top-0 left-0 w-screen h-screen z-10`}
    >
      <div
        onClick={hide}
        className="absolute top-0 left-0 h-full w-full bg-black	opacity-70"
      ></div>
      <div
        ref={ref}
        style={{
          ...style,
          transition: 'width 0.2s ease-in,height 0.2s ease-in',
        }}
        className="absolute"
      >
        <img
          className="w-full h-full object-cover"
          alt={urls[0]}
          src={urls[0]}
        />
      </div>
    </div>
  );
};

const ConfirmAble = ConfirmHOC(ImagePreview);
const previewImages = makeImperative(ConfirmAble);

export default previewImages;

import React from 'react';

interface IProps {
  src: string;
}

const Video = (props: IProps) => {
  return (
    <video controls className="overflow-hidden w-full h-[36ch]" src={props.src} />
  );
};
export default Video;

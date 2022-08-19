/* eslint-disable @next/next/no-img-element */
import React from 'react';
import EmblaCarousel from './EmblaCarousel';

interface IProps {
  slides: ITimeLineCardProps[];
}

export interface ITimeLineCardProps {
  title: string;
  date: string;
  subTitle?: string;
  contentText?: string;
  // type: 'image' | 'video' | 'text' | 'custom';
  imageUrls?: string[];
  videoUrl?: string;
  renderContent?: (
    props: Omit<ITimeLineCardProps, 'renderContent' | 'type'>,
  ) => JSX.Element;
}

const TimeLine = (props: IProps) => {
  const { slides } = props;
  return (
    <div className="w-full m-4">
      {slides.map((s) => {
        return <TimeLineCard key={s.title} {...s} />;
      })}
    </div>
  );
};

const TimeLineCard = (props: ITimeLineCardProps) => {
  const { renderContent, ...restProps } = props;
  const { title, date, subTitle, contentText, imageUrls, videoUrl } = restProps;

  // if(type === "custom" || typeof renderContent === "function"){
  //     return renderContent(restProps);
  // }

  const cardJSX =
    typeof renderContent === 'function' ? (
      renderContent(restProps)
    ) : (
      <>
        <div className="my-4 font-bold text-xl sticky top-0 dark:text-gray-300">{title}</div>
        <div className="rounded-1 bg-white dark:bg-black dark:border dark:border-[#333] min-h-[200px] p-4">
          <div className="color-[#0070f3] font-bold pb-4 text-lg">
            {subTitle}
          </div>
          <div className="pb-4 dark:color-coolgray">{contentText}</div>
          {videoUrl && (
            <div className="pb-4">
              <video
                className="w-full"
                controls
                src="https://media.w3.org/2010/05/sintel/trailer.mp4"
              />
            </div>
          )}

          {imageUrls && (
            <div className="rounded-2 overflow-hidden">
              {imageUrls?.length > 0 ? (
                <EmblaCarousel slides={imageUrls} />
              ) : (
                <img
                  className="w-full object-cover"
                  src="https://i2-prod.mirror.co.uk/incoming/article10847802.ece/ALTERNATES/s810/PAY-Dunkirk-in-colour.jpg"
                  alt="https://i2-prod.mirror.co.uk/incoming/article10847802.ece/ALTERNATES/s810/PAY-Dunkirk-in-colour.jpg"
                />
              )}
            </div>
          )}
        </div>
      </>
    );

  return (
    <div className="w-full flex items-stretch relative">
      <div className="relative flex items-center justify-center w-[10%]">
        <div className="absolute mx-auto w-[2px] bg-coolGray dark:bg-[#333] h-full"></div>
        <div className="absolute top-0 w-[16px] h-[16px] rounded-[50%] bg-amber mt-6"></div>
      </div>
      <div className="mb-4 box-border flex-1 relative">{cardJSX}</div>
    </div>
  );
};

export default TimeLine;

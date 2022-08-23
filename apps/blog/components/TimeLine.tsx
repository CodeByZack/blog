/* eslint-disable @next/next/no-img-element */
import React from 'react';
import EmblaCarousel from './EmblaCarousel';
import previewImages from './PreviewImage';

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
  isFirst?: boolean;
  isLast?: boolean;
}

const TimeLine = (props: IProps) => {
  const { slides } = props;
  return (
    <div className="w-full my-4">
      {slides.map((s, i) => {
        return (
          <TimeLineCard
            key={s.title}
            {...s}
            isFirst={i === 0}
            isLast={i === slides.length - 1}
          />
        );
      })}
    </div>
  );
};

const TimeLineCard = (props: ITimeLineCardProps) => {
  const { renderContent, isFirst, isLast, ...restProps } = props;
  const { title, date, subTitle, contentText, imageUrls, videoUrl } = restProps;

  // if(type === "custom" || typeof renderContent === "function"){
  //     return renderContent(restProps);
  // }

  const cardJSX =
    typeof renderContent === 'function' ? (
      renderContent(restProps)
    ) : (
      <>
        <div className="my-4 sticky top-0 dark:text-gray-300 flex flex-col justify-start md:flex-row md:justify-between md:items-center">
          <span className="font-bold text-xl">{title}</span>
          <span className="md:mt-0 mt-2">{date}</span>
        </div>
        <div className="rounded-1 bg-white dark:bg-black border border-gray-3 dark:border-[#333] min-h-[200px] p-4">
          <div className="color-[#3291ff] font-bold pb-4 text-lg">
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
      <div
        className={`relative hidden md:flex items-center justify-center md:w-[50px] ${
          isFirst ? 'pt-[50px]' : ''
        } ${isLast ? 'pb-[50px]' : ''}`}
      >
        <div
          className={`absolute mx-auto w-[2px] bg-gray-3 dark:bg-[#333] h-full left-[6px] `}
        ></div>
        <div className="absolute top-0 w-[16px] h-[16px] rounded-[50%] left-0 bg-black dark:bg-gray-100 mt-6"></div>
      </div>
      <div className="mb-4 box-border flex-1 relative shadow-light">
        {cardJSX}
      </div>
    </div>
  );
};

export default TimeLine;

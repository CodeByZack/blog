/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
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

const FullScreenIcon = (props: React.HTMLAttributes<any>) => {
  const [fullscreen, setFullscreen] = React.useState<boolean>(false);
  React.useEffect(() => {
    document.onfullscreenchange = () => {
      setFullscreen(Boolean(document.fullscreenElement));
    };
  }, []);
  return (
    <svg
      className="PhotoView-Slider__toolbarIcon"
      fill="white"
      width="44"
      height="44"
      viewBox="0 0 768 768"
      {...props}
    >
      {fullscreen ? (
        <path d="M511.5 256.5h96v63h-159v-159h63v96zM448.5 607.5v-159h159v63h-96v96h-63zM256.5 256.5v-96h63v159h-159v-63h96zM160.5 511.5v-63h159v159h-63v-96h-96z" />
      ) : (
        <path d="M448.5 160.5h159v159h-63v-96h-96v-63zM544.5 544.5v-96h63v159h-159v-63h96zM160.5 319.5v-159h159v63h-96v96h-63zM223.5 448.5v96h96v63h-159v-159h63z" />
      )}
    </svg>
  );
};

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

function toggleFullScreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    const element = document.querySelector('.PhotoView-Portal');
    if (element) {
      element.requestFullscreen();
    }
  }
}

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
        <div className="my-4 sticky top-0 flex flex-col justify-start md:flex-row md:justify-between md:items-center">
          <span className="font-bold text-xl color-[#3291ff]">{title}</span>
          <span className="md:mt-0 mt-2 dark:text-gray-300">{date}</span>
        </div>
        <div className="rounded-1 bg-white dark:bg-black border border-gray-3 dark:border-[#333] min-h-[200px] p-4">
          <div className=" dark:text-gray-300 font-bold pb-4 text-lg">
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

          <PhotoProvider
            // @ts-ignore
            toolbarRender={({ rotate, onRotate, onScale, scale, index }) => {
              return (
                <>
                  <svg
                    className="PhotoView-Slider__toolbarIcon"
                    width="44"
                    height="44"
                    viewBox="0 0 768 768"
                    fill="white"
                    onClick={() => onScale(scale + 0.5)}
                  >
                    <path d="M384 640.5q105 0 180.75-75.75t75.75-180.75-75.75-180.75-180.75-75.75-180.75 75.75-75.75 180.75 75.75 180.75 180.75 75.75zM384 64.5q132 0 225.75 93.75t93.75 225.75-93.75 225.75-225.75 93.75-225.75-93.75-93.75-225.75 93.75-225.75 225.75-93.75zM415.5 223.5v129h129v63h-129v129h-63v-129h-129v-63h129v-129h63z" />
                  </svg>
                  <svg
                    className="PhotoView-Slider__toolbarIcon"
                    width="44"
                    height="44"
                    viewBox="0 0 768 768"
                    fill="white"
                    onClick={() => onScale(scale - 0.5)}
                  >
                    <path d="M384 640.5q105 0 180.75-75.75t75.75-180.75-75.75-180.75-180.75-75.75-180.75 75.75-75.75 180.75 75.75 180.75 180.75 75.75zM384 64.5q132 0 225.75 93.75t93.75 225.75-93.75 225.75-225.75 93.75-225.75-93.75-93.75-225.75 93.75-225.75 225.75-93.75zM223.5 352.5h321v63h-321v-63z" />
                  </svg>
                  <svg
                    className="PhotoView-Slider__toolbarIcon"
                    onClick={() => onRotate(rotate + 90)}
                    width="44"
                    height="44"
                    fill="white"
                    viewBox="0 0 768 768"
                  >
                    <path d="M565.5 202.5l75-75v225h-225l103.5-103.5c-34.5-34.5-82.5-57-135-57-106.5 0-192 85.5-192 192s85.5 192 192 192c84 0 156-52.5 181.5-127.5h66c-28.5 111-127.5 192-247.5 192-141 0-255-115.5-255-256.5s114-256.5 255-256.5c70.5 0 135 28.5 181.5 75z" />
                  </svg>
                  {document.fullscreenEnabled && (
                    <FullScreenIcon onClick={toggleFullScreen} />
                  )}
                </>
              );
            }}
          >
            {imageUrls && (
              <div className="rounded-2 overflow-hidden">
                {imageUrls?.length > 1 ? (
                  <EmblaCarousel slides={imageUrls} />
                ) : (
                  <PhotoView key={imageUrls[0]} src={imageUrls[0]}>
                    <img
                      className="w-full object-contain max-h-2xl"
                      src={imageUrls[0]}
                      alt={imageUrls[0]}
                    />
                  </PhotoView>
                )}
              </div>
            )}
          </PhotoProvider>
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

import { PlayVideoTriangle } from '@diamantaire/shared/icons';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

import { ModularVideoBlockContainer } from './ModularVideoBlock.style';
import Heading from './molecules/Heading';
import ShowMobileOnly from './ShowMobileOnly';
import ShowTabletAndUpOnly from './ShowTabletAndUpOnly';

// See https://www.npmjs.com/package/react-player
const ReactPlayer = dynamic(() => import('react-player'));

type ModularVideoBlockProps = {
  shouldAutoplay?: boolean;
  showControls?: boolean;
  shouldLoop?: boolean;
  additionalClass?: string;
  title?: string;
  titleColor?: string;
  titleFont?: string;
  titleStyle?: string;
  video: {
    video: {
      streamingUrl: string;
    };
  };
  mobileVideo?: {
    video: {
      streamingUrl: string;
    };
  };
  shouldLazyLoad?: boolean;
};

const ModularVideoBlock = ({
  shouldAutoplay,
  video,
  mobileVideo,
  showControls,
  title,
  shouldLoop,
  additionalClass,
  titleColor,
  titleFont,
  titleStyle,
}: ModularVideoBlockProps) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(shouldAutoplay || false);

  const { streamingUrl } = video.video;
  const mobileStreamingUrl = mobileVideo?.video?.streamingUrl;

  function handleToggleVideoPlay() {
    setIsVideoPlaying(!isVideoPlaying);
  }

  return (
    <ModularVideoBlockContainer
      className={additionalClass}
      onClick={handleToggleVideoPlay}
      $titleColor={titleColor}
      $titleFont={titleFont}
      $titleStyle={titleStyle}
    >
      <div className="video-block__icon-container">
        <div
          className={clsx('video-block__icon', {
            videoPlaying: isVideoPlaying,
          })}
        >
          <PlayVideoTriangle />
        </div>
      </div>
      {title && (
        <Heading type="h2" className="h1 video-block__title">
          {title}
        </Heading>
      )}
      <ShowTabletAndUpOnly>
        <ReactPlayer
          url={streamingUrl}
          playing={isVideoPlaying}
          playsinline
          height="100%"
          width="100%"
          muted={shouldAutoplay}
          loop={shouldLoop}
          controls={showControls}
          config={{
            file: {
              attributes: { title },
            },
          }}
        />
      </ShowTabletAndUpOnly>
      <ShowMobileOnly extraClass="video-block__mobile-wrapper">
        <ReactPlayer
          url={mobileStreamingUrl || streamingUrl}
          playing={isVideoPlaying}
          playsinline
          height="100%"
          width="100%"
          muted={shouldAutoplay}
          loop={shouldLoop}
          controls={showControls}
          config={{
            file: {
              attributes: { title },
            },
          }}
        />
      </ShowMobileOnly>
    </ModularVideoBlockContainer>
  );
};

export default ModularVideoBlock;

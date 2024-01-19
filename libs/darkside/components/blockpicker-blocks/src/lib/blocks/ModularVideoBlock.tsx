import { Heading, ShowTabletAndUpOnly, ShowMobileOnly } from '@diamantaire/darkside/components/common-ui';
import { PlayVideoTriangleIcon } from '@diamantaire/shared/icons';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { ModularVideoBlockStyles } from './ModularVideoBlock.style';

// See https://www.npmjs.com/package/react-player
const ReactPlayer = dynamic(() => import('react-player'));

type ModularVideoBlockProps = {
  shouldAutoplay?: boolean;
  showControls?: boolean;
  shouldLoop?: boolean;
  additionalClass?: string;
  title?: string;
  titleColor?: {
    hex: string;
  };
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

const ModularVideoBlock = (props: ModularVideoBlockProps) => {
  console.log('ModularVideoBlockProps', props);
  const {
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
  } = props || {};
  const [isVideoPlaying, setIsVideoPlaying] = useState(shouldAutoplay || false);

  const { streamingUrl } = video.video;
  const mobileStreamingUrl = mobileVideo?.video?.streamingUrl;

  return (
    <ModularVideoBlockStyles
      className={additionalClass}
      $titleColor={titleColor?.hex}
      $titleFont={titleFont}
      $titleStyle={titleStyle}
    >
      <div className="video-block__icon-container">
        <div
          className={clsx('video-block__icon', {
            videoPlaying: isVideoPlaying,
          })}
        >
          <PlayVideoTriangleIcon />
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
          playing={true}
          playsinline
          height="100%"
          width="100%"
          muted={shouldAutoplay}
          loop={shouldLoop}
          controls={showControls}
          onPlay={() => setIsVideoPlaying(true)}
          onPause={() => setIsVideoPlaying(false)}
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
    </ModularVideoBlockStyles>
  );
};

export default ModularVideoBlock;

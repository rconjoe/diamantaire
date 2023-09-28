import { DatoImage } from '@diamantaire/darkside/components/common-ui';
import { UniLink } from '@diamantaire/darkside/core';
import { getRelativeUrl } from '@diamantaire/shared/helpers';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { VideoSlideContainer } from './VideoHoverSlide.style';

const ReactPlayer = dynamic(() => import('react-player'));

const VideoHoverSlide = (props) => {
  const { title, image, hover, url, isMobile } = props;

  const video = hover?.video;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <VideoSlideContainer>
      <UniLink route={getRelativeUrl(url)}>
        <div
          onMouseLeave={() => setIsHovered(false)}
          onMouseEnter={() => setIsHovered(true)}
          onContextMenu={(e) => e.preventDefault()}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
        >
          <div className="list-item__media">
            <DatoImage image={image} overrideAlt={title} quality={90} />

            {Boolean(hover) && !isMobile && (
              <div className="list-item__media--hover">
                {video?.streamingUrl && (
                  <ReactPlayer
                    url={video.streamingUrl}
                    volume={0}
                    muted
                    loop
                    height="100%"
                    width="100%"
                    playing={isHovered ? true : false}
                    playsinline
                    css={{
                      position: `absolute`,
                      top: 0,
                      left: 0,
                    }}
                  />
                )}
              </div>
            )}
          </div>

          <div className="list-item__copy">{title && <span className="list-item__copy-title">{title}</span>}</div>
        </div>
      </UniLink>
    </VideoSlideContainer>
  );
};

export default VideoHoverSlide;

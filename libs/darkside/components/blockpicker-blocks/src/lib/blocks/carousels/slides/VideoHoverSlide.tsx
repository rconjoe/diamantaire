import { UniLink } from '@diamantaire/darkside/core';
import { useGlobalContext } from '@diamantaire/darkside/data/hooks';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { useState } from 'react';

import { VideoSlideContainer } from './VideoHoverSlide.style';

// TODO: Let's figure out the best way to load videos for this

const ReactPlayer = dynamic(() => import('react-player'));

const VideoHoverSlide = (props) => {
  const { title, image, hover, url, isMobile } = props;

  const video = hover?.video;
  const [isHovered, setIsHovered] = useState(false);

  const initialImage = {
    src: image.url,
    width: image.responsiveImage.width,
    height: image.responsiveImage.height,
    alt: image.alt,
  };

  const { getRelativeUrl } = useGlobalContext();

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
            <Image alt={initialImage?.alt} src={initialImage.src} width={initialImage.width} height={initialImage.height} />

            {Boolean(hover) && !isMobile && (
              <div className="list-item__media--hover">
                {video?.streamingUrl ? (
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
                ) : (
                  <p>temp</p>
                  //   <Image alt={hover?.alt} image={hover} />
                )}
              </div>
            )}
          </div>

          <div className="list-item_copy">{title && <span className="list-item_copy-title">{title}</span>}</div>
        </div>
      </UniLink>
    </VideoSlideContainer>
  );
};

export default VideoHoverSlide;

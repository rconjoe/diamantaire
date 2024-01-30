import { Heading } from '@diamantaire/darkside/components/common-ui';
import { PlayVideoTriangleIcon } from '@diamantaire/shared/icons';
import { media, contentBlockMargin } from '@diamantaire/styles/darkside-styles';
import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import styled from 'styled-components';

const ReactPlayer = dynamic(() => import('react-player/lazy'));

const ModularSplitVideoBlockContainer = styled.div`
  ${contentBlockMargin}

  .split-video__wrapper {
    ${media.medium`display: flex;align-items: flex-end;`}
    > * {
      flex: 1;
    }

    .split-video__video {
      flex: 1.73;
      position: relative;

      > .react-player {
        height: 25rem !important;
        ${media.medium`height: 50rem !important;`}
      }

      .react-player__shadow {
        display: none !important;
      }

      video {
        object-fit: contain;
        object-position: bottom;
        display: flex;
        width: 100%;
      }

      .stop-video,
      .start-video {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: transparent;
        border: none;
      }

      .start-video {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 10rem;
        width: 10rem;
        background-color: rgb(158 158 158 / 56%);
        border-radius: 50%;

        svg {
          position: relative;
          left: 0.5rem;
        }
      }
    }

    .split-video__content {
      .split-video__content-inner {
        padding: calc(var(--gutter) / 2) 0 0 0;
        ${media.medium`padding: 0 var(--gutter);`}

        .split-video__title {
          margin-bottom: 1.6rem;
        }

        p {
          font-size: 1.9rem;
        }
      }
    }
  }
`;

const ModularSplitVideoBlock = (props) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [hasVideoInitialized, setHasVideoInitialized] = useState(false);
  const { copy, title, videoSources, thumbnail } = props;

  const videoUrls = videoSources?.map((video) => video?.url);

  const playerRef = useRef(null);

  return (
    <ModularSplitVideoBlockContainer className="container-wrapper">
      <div className="split-video__wrapper">
        <div className="split-video__video">
          <ReactPlayer
            url={videoUrls}
            playsinline
            ref={playerRef}
            playing={isVideoPlaying}
            className="react-player"
            width="100%"
            loop={true}
            controls={false}
            light={thumbnail?.url}
            playIcon={
              <div className="icon-wrapper">
                <PlayVideoTriangleIcon />
              </div>
            }
            config={{
              file: {
                attributes: { title },
              },
            }}
            onPlay={() => setHasVideoInitialized(true)}
          />

          {hasVideoInitialized && (
            <>
              {!isVideoPlaying ? (
                <button className="start-video" onClick={() => setIsVideoPlaying(true)}>
                  <div className="icon-wrapper">
                    <PlayVideoTriangleIcon />
                  </div>
                </button>
              ) : (
                <button className="stop-video" onClick={() => setIsVideoPlaying(false)}></button>
              )}
            </>
          )}
        </div>
        <div className="split-video__content">
          <div className="split-video__content-inner">
            <Heading type="h2" className="h1 secondary split-video__title">
              {title}
            </Heading>
            <p>{copy}</p>
          </div>
        </div>
      </div>
    </ModularSplitVideoBlockContainer>
  );
};

export default ModularSplitVideoBlock;

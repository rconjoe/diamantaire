import { Heading } from '@diamantaire/darkside/components/common-ui';
import { media, setSpace, tabletAndUp } from '@diamantaire/styles/darkside-styles';
import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import styled from 'styled-components';

const ReactPlayer = dynamic(() => import('react-player/lazy'));

const ModularSplitVideoBlockContainer = styled.div`
  padding-bottom: calc(var(--gutter) * 2);
  .split-video__wrapper {
    ${media.medium`display: flex;align-items: flex-end;`}
    > * {
      flex: 1;
    }

    .split-video__video {
      flex: 1.73;
      position: relative;

      > .react-player {
        height: 250px !important;
        ${media.medium`height: 500px !important;`}
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

      .toggle-video {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: transparent;
        border: none;
      }

      .video-block__icon-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .video-block__icon {
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(255, 255, 255, 0.5);
        height: ${setSpace(6)};
        width: ${setSpace(6)};
        border-radius: 50%;
        ${tabletAndUp(`
      height: ${setSpace(12)};
      width: ${setSpace(12)};
    `)};

        transition: opacity 0.33s ease;

        &.videoPlaying {
          opacity: 0;
        }

        svg {
          height: ${setSpace(3)};
          width: ${setSpace(3)};
          padding-left: ${setSpace(0.5)};
          ${tabletAndUp(`
            height: ${setSpace(6)};
            width: ${setSpace(6)};
            padding-left: ${setSpace(1)};
        `)};
        }
      }
    }

    .split-video__content {
      .split-video__content-inner {
        padding: calc(var(--gutter) / 2) 0;
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
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
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
            playing={true}
            className="react-player"
            width="100%"
            muted={true}
            loop={true}
            controls={false}
            light={thumbnail?.url}
            config={{
              file: {
                attributes: { title },
              },
            }}
            onPlay={() => setIsVideoPlaying(true)}
            onPause={() => setIsVideoPlaying(false)}
          />
          {isVideoPlaying && (
            <button
              className="toggle-video"
              onClick={() => {
                setIsVideoPlaying(!isVideoPlaying);
              }}
            ></button>
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

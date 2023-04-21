import { media } from '@diamantaire/styles/darkside-styles';
import dynamic from 'next/dynamic';
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
      flex: 1.5;

      > * {
        height: 250px !important;
        ${media.medium`height: 500px !important;`}
      }

      video {
        object-fit: cover;
        display: flex;
        width: 100%;
      }
    }

    .split-video__content {
      .split-video__content-inner {
        padding: calc(var(--gutter) / 2) 0;
        ${media.medium`padding: 0 var(--gutter);`}
      }
    }
  }
`;

const ModularSplitVideoBlock = (props) => {
  const { copy, title, videoSources, thumbnail } = props;

  const videoUrls = videoSources?.map((video) => video?.url);

  return (
    <ModularSplitVideoBlockContainer className="container-emotion">
      <div className="split-video__wrapper">
        <div className="split-video__video">
          <ReactPlayer
            url={videoUrls}
            playing={true}
            playsinline
            width="100%"
            muted={false}
            loop={true}
            controls={true}
            light={thumbnail?.url}
            config={{
              file: {
                attributes: { title },
              },
            }}
          />
        </div>
        <div className="split-video__content">
          <div className="split-video__content-inner">
            <h3>{title}</h3>
            <p>{copy}</p>
          </div>
        </div>
      </div>
    </ModularSplitVideoBlockContainer>
  );
};

export default ModularSplitVideoBlock;

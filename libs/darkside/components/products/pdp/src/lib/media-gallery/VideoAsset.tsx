import dynamic from 'next/dynamic';
import styled from 'styled-components';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const VideoAssetContainer = styled.div`
  aspect-ratio: 1/1;
  position: relative;

  video {
    object-fit: cover;
  }

  .overlay-text {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 1rem;
    text-align: center;
    width: 100%;
  }
`;

export function VideoAsset({ video }) {
  if (!video) return null;

  const { title, customData } = video;

  const { streamingUrl, thumbnailUrl } = video?.video || {};

  const doesVideoHaveTitle = title && title.length > 0;

  return (
    <VideoAssetContainer>
      {streamingUrl && (
        <>
          <ReactPlayer
            height="100%"
            width="100%"
            playing
            loop
            muted
            playsinline={true}
            url={streamingUrl}
            controls={false}
            config={{
              file: {
                attributes: {
                  title: video.title,
                  poster: thumbnailUrl,
                },
              },
            }}
          />

          {doesVideoHaveTitle && (
            <p
              className="overlay-text"
              style={{
                color: customData?.color || 'var(--color-black)',
              }}
            >
              {title}
            </p>
          )}
        </>
      )}
    </VideoAssetContainer>
  );
}

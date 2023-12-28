import dynamic from 'next/dynamic';
import styled from 'styled-components';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const VideoAssetContainer = styled.div`
  aspect-ratio: 1/1;
  position: relative;
  video {
    object-fit: cover;
  }
`;

export function VideoAsset({ video }) {
  if (!video) return null;

  const { streamingUrl } = video?.video || {};

  return (
    <VideoAssetContainer>
      {streamingUrl && (
        <ReactPlayer height="100%" width="100%" playing loop muted playsinline={true} url={streamingUrl} controls={false} />
      )}
    </VideoAssetContainer>
  );
}

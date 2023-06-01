import { DatoImageType, MediaAsset, MimeTypes } from '@diamantaire/shared/types';
import dynamic from 'next/dynamic';
import Image, { ImageLoaderProps } from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import SpriteSpinner from '../spritespinner/SpriteSpinner';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

interface MediaGalleryProps {
  assets: MediaAsset[]; // define Asset (from DATO)
  options?: unknown;
  title?: string;
}

const MediaGalleryStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: dense;
  gap: 6px;
  width: 100%;
`;

function MediaGallery({ assets, options, title }: MediaGalleryProps) {
  return (
    assets && (
      <MediaGalleryStyles>
        {assets.map((asset) => (
          <MediaAsset key={asset.id} type={asset.mimeType} asset={asset} options={options} defaultAlt={title} />
        ))}
      </MediaGalleryStyles>
    )
  );
}

export { MediaGallery };

interface MediaAssetProps {
  type: MimeTypes;
  asset: MediaAsset;
  options?: unknown;
  defaultAlt?: string;
}

function MediaAsset({ type, asset, options, defaultAlt }: MediaAssetProps) {
  switch (type) {
    case MimeTypes.ImageJpeg: {
      if (asset.customData?.bunny === 'true') {
        return <SpriteSpinnerBlock sprite={asset} options={options} />;
      }

      return <ImageAsset image={asset} defaultAlt={defaultAlt} />;
    }
    case MimeTypes.VideoMP4:
    case MimeTypes.VideoMov:
    case MimeTypes.QuicktimeVideo: {
      return <VideoAsset video={asset} />;
    }
    default: {
      // Unexpected mime type provided
      return null;
    }
  }
}

const ImageAssetStyles = styled.div`
  aspect-ratio: 1/1;
  position: relative;
`;

function ImageAsset({ image, defaultAlt }: { image: DatoImageType; defaultAlt: string }) {
  const { alt, url } = image;

  const loader = ({ src, width, quality = 50 }: ImageLoaderProps) => {
    const params = {
      auto: 'format',
      ar: '1%3A1',
      fit: 'crop',
      crop: 'focalpoint',
      w: width.toString(),
      q: quality.toString(),
    };
    const searchParams = new URLSearchParams(params);

    return `${src}?${searchParams.toString()}`;
  };

  return (
    <ImageAssetStyles>
      <Image
        alt={alt || defaultAlt}
        src={url}
        placeholder="blur"
        blurDataURL={image.responsiveImage.base64}
        fill
        style={{ objectFit: 'cover' }}
        loader={loader}
      />
    </ImageAssetStyles>
  );
}

const VideoAssetContainer = styled.div``;

function VideoAsset({ video }) {
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

function SpriteSpinnerBlock({ sprite, options }) {
  const { diamondType, bandAccent, metal } = options;
  const spriteImage = sprite;
  const { query } = useRouter();
  const bunny360BaseURL = `https://vrai-assets.b-cdn.net/${query.productSlug}/${diamondType}/${
    bandAccent ? bandAccent + '/' : ''
  }${metal}`;

  console.log('spriteImage', spriteImage);

  return <SpriteSpinner spriteSource={'bunny'} bunnyBaseURL={bunny360BaseURL} shouldStartSpinner={true} />;
}

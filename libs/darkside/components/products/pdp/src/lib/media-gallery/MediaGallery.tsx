import dynamic from 'next/dynamic';
import Image, { ImageLoaderProps } from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import SpriteSpinner from '../spritespinner/SpriteSpinner';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

enum MimeTypes {
  ImageJpeg = 'image/jpeg',
  VideoMP4 = 'video/mp4',
  VideoMov = 'video/mov',
  QuicktimeVideo = 'video/quicktime',
}

interface MediaAsset {
  id: string;
  url: string;
  alt?: string;
  mimeType: MimeTypes;
}

interface MediaGalleryProps {
  assets: MediaAsset[]; // define Asset (from DATO)
  options?: any;
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
          <MediaAsset key={asset.id} type={asset.mimeType} asset={asset} options={options} productTitle={title} />
        ))}
      </MediaGalleryStyles>
    )
  );
}

export { MediaGallery };

interface MediaAsset {
  type: MimeTypes;
  asset: MediaAsset;
  customData?: {
    sprite?: boolean;
    mobile?: boolean;
  };
}

function MediaAsset({ type, asset, options, productTitle }) {
  switch (type) {
    case MimeTypes.ImageJpeg: {
      if (asset.customData?.bunny === 'true') {
        return <SpriteSpinnerBlock sprite={asset} options={options} />;
      }

      return <ImageAsset image={asset} productTitle={productTitle} />;
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

interface ImageAsset {
  alt?: string;
  url: string;
  width: number;
  height: number;
}

const ImageAssetStyles = styled.div`
  aspect-ratio: 1/1;
  position: relative;
`;

function ImageAsset({ image, productTitle }) {
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
        alt={alt || productTitle}
        src={url}
        placeholder="blur"
        blurDataURL={image.responsiveImage.base64}
        layout="fill"
        style={{ objectFit: 'cover' }}
        loader={loader}
      />
    </ImageAssetStyles>
  );
}

const VideoAssetContainer = styled.div``;

function VideoAsset({ video }) {
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

import { SpriteSpinner, UIString } from '@diamantaire/darkside/components/common-ui';
import { DiamondHand } from '@diamantaire/darkside/components/diamonds';
import { DatoImageType, MediaAsset, MimeTypes } from '@diamantaire/shared/types';
import { media } from '@diamantaire/styles/darkside-styles';
import dynamic from 'next/dynamic';
import Image, { ImageLoaderProps } from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

interface MediaGalleryProps {
  assets: MediaAsset[]; // define Asset (from DATO)
  options?: unknown;
  title?: string;
  disableVideos?: boolean;
  productType: string;
  shownWithCtw?: string;
  diamondType?: string;
}

const MediaGalleryStyles = styled.div`
  display: none;
  grid-auto-flow: dense;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  width: 100%;
  ${media.medium`display: grid;`}
`;

function MediaGallery({
  assets,
  options,
  title,
  disableVideos = false,
  productType,
  shownWithCtw,
  diamondType,
}: MediaGalleryProps) {
  return (
    assets && (
      <MediaGalleryStyles>
        {assets.map((asset, index) => (
          <MediaAsset
            key={asset.id}
            type={asset.mimeType}
            asset={asset}
            options={options}
            defaultAlt={title}
            disableVideos={disableVideos}
            productType={productType}
            index={index}
            shownWithCtw={shownWithCtw}
          />
        ))}
        {productType === 'Engagement Ring' && (
          <DiamondHand
            withSlider={true}
            diamondType={diamondType}
            lotId={`cfy-${diamondType}`}
            initRange={[0.5, 8]}
            initValue={2}
          />
        )}
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
  disableVideos?: boolean;
  productType: string;
  index: number;
  shownWithCtw?: string;
}

function MediaAsset({ type, asset, options, defaultAlt, disableVideos, productType, index, shownWithCtw }: MediaAssetProps) {
  switch (type) {
    case MimeTypes.ImagePng:
    case MimeTypes.ImageJpeg: {
      if (asset.customData?.bunny === 'true') {
        return <SpriteSpinnerBlock sprite={asset} options={options} />;
      }

      return (
        <ImageAsset
          image={asset}
          defaultAlt={defaultAlt}
          productType={productType}
          index={index}
          shownWithCtw={shownWithCtw}
        />
      );
    }
    case MimeTypes.VideoMP4:
    case MimeTypes.VideoMov:
    case MimeTypes.QuicktimeVideo: {
      if (disableVideos) return null;

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

  p {
    position: absolute;
    bottom: 15px;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: var(--font-size-xxxsmall);
  }
`;

type ImageAssetProps = {
  image: DatoImageType;
  defaultAlt: string;
  productType: string;
  index: number;
  shownWithCtw?: string;
};

function ImageAsset({ image, defaultAlt, productType, index, shownWithCtw }: ImageAssetProps) {
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
      {index === 0 && productType === 'Engagement Ring' && (
        <p>
          <UIString>Shown with </UIString>
          {shownWithCtw ? shownWithCtw : '1.5ct'}
        </p>
      )}
    </ImageAssetStyles>
  );
}

const VideoAssetContainer = styled.div`
  aspect-ratio: 1/1;
  position: relative;
  video {
    object-fit: cover;
  }
`;

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

  return null;

  return (
    <SpriteSpinner
      spriteImage={spriteImage}
      spriteSource={'bunny'}
      bunnyBaseURL={bunny360BaseURL}
      shouldStartSpinner={true}
    />
  );
}

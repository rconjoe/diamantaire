import { UIString } from '@diamantaire/darkside/components/common-ui';
import { DatoImageType, MediaAsset, MimeTypes } from '@diamantaire/shared/types';
import dynamic from 'next/dynamic';
import Image, { ImageLoaderProps } from 'next/image';
import styled from 'styled-components';

import { SpriteSpinnerBlock } from './SpriteSpinnerBlock';
import { ProductDiamondHand } from '../ProductDiamondHand';

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

  gap: 0.6rem;
  width: 100%;
  @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
    display: flex;
    flex-wrap: wrap;

    > * {
      flex: 0 0 calc(50% - 0.3rem);
    }
  }
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
          <ProductDiamondHand diamondType={diamondType} range={[0.5, 8]} initValue={2} />
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
      if (asset.customData?.bunny === 'true' || asset.customData?.sprite === 'true') {
        return (
          <SpriteSpinnerBlock
            sprite={asset}
            options={options}
            srcType={asset.customData?.sprite === 'true' ? 'legacy' : 'bunny'}
            mobile={asset.customData?.mobile === 'true'}
          />
        );
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
    bottom: 1.5rem;
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
  const { alt, url, title } = image;

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

    return `${src}?${searchParams.toString()}&dpr=2`;
  };

  console.log('title', title);
  const doesImageHavTitle = title && title.length > 0;

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

      {doesImageHavTitle && <p>title</p>}
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

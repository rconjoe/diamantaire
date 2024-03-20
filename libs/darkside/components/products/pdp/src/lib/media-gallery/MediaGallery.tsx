import { UIString } from '@diamantaire/darkside/components/common-ui';
import { DatoImageType, MediaAsset, MimeTypes } from '@diamantaire/shared/types';
import Image, { ImageLoaderProps } from 'next/image';
import styled from 'styled-components';

import { SpriteSpinnerBlock } from './SpriteSpinnerBlock';
import { VideoAsset } from './VideoAsset';
import { ProductDiamondHand } from '../ProductDiamondHand';

interface MediaGalleryProps {
  assets: MediaAsset[]; // define Asset (from DATO)
  options?: unknown;
  title?: string;
  disableVideos?: boolean;
  productType: string;
  shownWithCtw?: string;
  diamondType?: string;
  disableHandSliderControls?: boolean;
  presetHandSliderValue?: number;
  shouldDisplayDiamondHand?: boolean;
}

const MediaGalleryStyles = styled.div`
  display: none;

  gap: 0.6rem;
  width: 100%;
  @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
    display: flex;
    flex-wrap: wrap;

    > * {
      min-width: calc(50% - 0.6rem);
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
  disableHandSliderControls = false,
  presetHandSliderValue,
  shouldDisplayDiamondHand = false,
}: MediaGalleryProps) {
  return (
    assets && (
      <MediaGalleryStyles>
        {assets.map((asset, index) => {
          const contentIsAboveFold = index < 4;

          const shouldLazyLoad = contentIsAboveFold ? false : true;

          return (
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
              shouldLazyLoad={shouldLazyLoad}
            />
          );
        })}
        {shouldDisplayDiamondHand && (
          <ProductDiamondHand
            disableControls={disableHandSliderControls}
            diamondType={diamondType}
            range={[0.5, 8]}
            initValue={presetHandSliderValue || 2}
            prefix={presetHandSliderValue + 'ct'}
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
  shouldLazyLoad?: boolean;
}

function MediaAsset({
  type,
  asset,
  options,
  defaultAlt,
  disableVideos,
  productType,
  index,
  shownWithCtw,
  shouldLazyLoad,
}: MediaAssetProps) {
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
          shouldLazyLoad={shouldLazyLoad}
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
    font-size: var(--font-size-xxsmall);
  }
`;

type ImageAssetProps = {
  image: DatoImageType;
  defaultAlt: string;
  productType: string;
  index: number;
  shownWithCtw?: string;
  shouldLazyLoad?: boolean;
};

function ImageAsset({ image, defaultAlt, productType, index, shownWithCtw, shouldLazyLoad }: ImageAssetProps) {
  const { alt, url, title, customData } = image;

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

  const doesImageHavTitle = title && title.length > 0;
  const imageProps = {
    ...(typeof shouldLazyLoad === 'boolean'
      ? {
          priority: !shouldLazyLoad,
          loading: (shouldLazyLoad ? 'lazy' : 'eager') as 'lazy' | 'eager',
        }
      : {}),
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
        {...imageProps}
      />

      {index === 0 && productType === 'Engagement Ring' && (
        <p>
          <UIString>Shown with</UIString> {shownWithCtw ? shownWithCtw : '1.5ct'}
        </p>
      )}

      {doesImageHavTitle && (
        <p
          className="overlay-text"
          style={{
            color: customData?.color || 'var(--color-black)',
          }}
        >
          {title}
        </p>
      )}
    </ImageAssetStyles>
  );
}

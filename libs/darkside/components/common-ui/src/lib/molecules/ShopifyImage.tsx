import { DatoImageType } from '@diamantaire/shared/types';
import clsx from 'clsx';
import Image, { ImageLoaderProps } from 'next/image';
import styled from 'styled-components';

type ShopifyImageProps = {
  className?: string;
  overrideAlt?: string;
  shouldLazyLoad?: boolean;
  image: DatoImageType;
  defaultAlt?: string;
};

const ShopifyImageContainer = styled.div`
  width: 100%;

  > div {
    position: unset !important;
  }

  .image {
    object-fit: cover;
    width: 100% !important;
    position: relative !important;
    height: unset !important;
  }
`;

const ShopifyImage = ({ image, className, overrideAlt, defaultAlt = '', shouldLazyLoad = true }: ShopifyImageProps) => {
  const { url, alt, responsiveImage } = image || {};
  const { aspectRatio } = responsiveImage || {};

  const loader = ({ src, width, quality = 50 }: ImageLoaderProps) => {
    const params = {
      auto: 'format, compress',
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
    <ShopifyImageContainer>
      <Image
        alt={overrideAlt ? overrideAlt : alt ? alt : defaultAlt}
        src={url}
        placeholder={responsiveImage?.base64 ? 'blur' : 'empty'}
        blurDataURL={responsiveImage?.base64}
        loader={loader}
        className={clsx('image', className)}
        sizes={responsiveImage ? responsiveImage?.width + 'px' : image?.width + 'px'}
        loading={shouldLazyLoad ? 'lazy' : 'eager'}
        fill={true}
        style={{
          aspectRatio,
        }}
      />
    </ShopifyImageContainer>
  );
};

export { ShopifyImage };

import { DatoImageType } from '@diamantaire/shared/types';
import clsx from 'clsx';
import Image, { ImageLoaderProps } from 'next/image';
import styled from 'styled-components';

type DatoImageProps = {
  className?: string;
  overrideAlt?: string;
  shouldLazyLoad?: boolean;
  isSVG?: boolean;
  image: DatoImageType;
};

const DatoImageContainer = styled.div`
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

const DatoImage = ({ image, className, overrideAlt, shouldLazyLoad = true, isSVG = false }: DatoImageProps) => {
  const { alt, responsiveImage } = image || {};
  const { aspectRatio, src: responsiveImageSrc } = responsiveImage || {};

  const isSvgCheck =
    isSVG || (!image?.width && !image?.responsiveImage?.width && !image?.height && !image?.responsiveImage?.height);

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

  return isSvgCheck ? (
    <img src={image.url} alt={alt} />
  ) : (
    <DatoImageContainer>
      <Image
        alt={overrideAlt ? overrideAlt : alt ? alt : ''}
        src={responsiveImageSrc}
        placeholder="blur"
        blurDataURL={responsiveImage?.base64}
        loader={loader}
        className={clsx('image', className)}
        sizes={responsiveImage ? responsiveImage.width + 'px' : image.width + 'px'}
        loading={shouldLazyLoad ? 'lazy' : 'eager'}
        fill={true}
        style={{
          aspectRatio,
        }}
      />
    </DatoImageContainer>
  );
};

export { DatoImage };

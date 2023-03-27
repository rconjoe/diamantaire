import { DatoImageType } from '@diamantaire/shared/types';
import clsx from 'clsx';
import Image, { ImageLoaderProps } from 'next/image';
import styled from 'styled-components';

type DatoImageProps = {
  className?: string;
  overrideAlt?: string;
  shouldLazyLoad?: boolean;
  image: DatoImageType;
};

const DatoImageContainer = styled.div`
  width: 100%;
  position: relative;
  > div {
    position: unset !important;
  }

  .image {
    object-fit: cover !important;
    width: 100% !important;
    position: relative !important;
    height: unset !important;
  }
`;

const DatoImage = ({ image, className, overrideAlt, shouldLazyLoad = true }: DatoImageProps) => {
  const { alt, responsiveImage } = image || {};
  const { aspectRatio, src: responsiveImageSrc } = responsiveImage || {};

  const loader = ({ src, width, quality = 80 }: ImageLoaderProps) => {
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
    <DatoImageContainer>
      <Image
        alt={overrideAlt ? overrideAlt : alt}
        src={responsiveImageSrc}
        placeholder="blur"
        blurDataURL={responsiveImage?.base64}
        loader={loader}
        className={clsx('image', className)}
        sizes={responsiveImage ? responsiveImage.width + 'px' : image.width + 'px'}
        // width={responsiveImage ? responsiveImage.width : image.width}
        // height={responsiveImage ? responsiveImage.height : image.height}
        loading={shouldLazyLoad ? 'lazy' : 'eager'}
        style={{
          aspectRatio,
        }}
        fill
      />
    </DatoImageContainer>
  );
};

export { DatoImage };

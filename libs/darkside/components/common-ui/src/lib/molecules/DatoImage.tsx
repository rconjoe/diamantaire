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
  quality?: number;
};

const DatoImageContainer = styled.div`
  width: 100%;
  position: relative;

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

const DatoImage = ({ image, className, overrideAlt, shouldLazyLoad = true, isSVG = false, quality }: DatoImageProps) => {
  const { alt, responsiveImage } = image || {};

  const { aspectRatio, src: responsiveImageSrc } = responsiveImage || {};

  const isSvgCheck =
    image.mimeType === 'image/svg' ||
    isSVG ||
    (!image?.width && !image?.responsiveImage?.width && !image?.height && !image?.responsiveImage?.height);

  const loader = ({ src }: ImageLoaderProps) => {
    return `${src}`;
  };

  return isSvgCheck ? (
    <img src={image.url} alt={overrideAlt || alt} />
  ) : (
    <DatoImageContainer>
      <Image
        alt={overrideAlt ? overrideAlt : alt ? alt : ''}
        src={responsiveImageSrc}
        placeholder="blur"
        blurDataURL={responsiveImage?.base64}
        loader={() => loader({ src: responsiveImageSrc, width: responsiveImage?.width, quality })}
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

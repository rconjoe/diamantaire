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

const DatoImage = (props: DatoImageProps) => {
  const { image, className, overrideAlt, isSVG = false, quality = 50 } = props;
  let { shouldLazyLoad } = props;
  const { alt, responsiveImage } = image || {};

  if (shouldLazyLoad) {
    shouldLazyLoad = true;
  }

  if (!image) return null;

  const { aspectRatio, src: responsiveImageSrc } = responsiveImage || {};

  const isSvgCheck =
    image?.mimeType === 'image/svg' ||
    isSVG ||
    (!image?.width && !image?.responsiveImage?.width && !image?.height && !image?.responsiveImage?.height);

  const loader = ({ src, width, quality = 50 }: ImageLoaderProps) => {
    const datoUrl = new URL(src);

    const params = {
      w: width.toString(),
      q: quality.toString(),
    };

    for (const [key, value] of Object.entries(params)) {
      if (value) {
        datoUrl.searchParams.set(key, value);
      }
    }

    return datoUrl.toString();
  };

  return isSvgCheck && image?.url ? (
    <img src={image.url} alt={overrideAlt || alt} />
  ) : (
    <DatoImageContainer>
      {responsiveImage && responsiveImageSrc && (
        <Image
          alt={overrideAlt ? overrideAlt : alt ? alt : ''}
          src={responsiveImageSrc}
          placeholder="blur"
          blurDataURL={responsiveImage?.base64}
          loader={() => loader({ src: responsiveImageSrc, width: responsiveImage?.width, quality })}
          className={clsx('image', className)}
          sizes={responsiveImage ? responsiveImage?.width + 'px' : image?.width + 'px'}
          priority={!shouldLazyLoad}
          loading={shouldLazyLoad ? 'lazy' : 'eager'}
          fill={true}
          style={{
            aspectRatio,
          }}
        />
      )}
    </DatoImageContainer>
  );
};

export { DatoImage };

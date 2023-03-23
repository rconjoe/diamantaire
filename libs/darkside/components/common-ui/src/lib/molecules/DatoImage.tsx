import { DatoImageType } from '@diamantaire/shared/types';
import Image, { ImageLoaderProps } from 'next/image';

type DatoImageProps = {
  className?: string;
  overrideAlt?: string;
  image: DatoImageType;
};

const DatoImage = ({ image, className, overrideAlt }: DatoImageProps) => {
  const { alt, responsiveImage } = image || {};
  const { aspectRatio, src: responsiveImageSrc } = responsiveImage || {};

  const isSvg = !image?.width && !image?.responsiveImage?.width && !image?.height && !image?.responsiveImage?.height;

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

  return isSvg ? (
    <img src={image.url} alt={alt} />
  ) : (
    <Image
      alt={overrideAlt ? overrideAlt : alt}
      src={responsiveImageSrc}
      placeholder="blur"
      blurDataURL={responsiveImage?.base64}
      loader={loader}
      className={className}
      // sizes={responsiveImage ? responsiveImage.width + 'px' : image.width + 'px'}
      width={responsiveImage ? responsiveImage.width : image.width}
      height={responsiveImage ? responsiveImage.height : image.height}
      loading="eager"
      style={{
        aspectRatio,
      }}
    />
  );
};

export { DatoImage };

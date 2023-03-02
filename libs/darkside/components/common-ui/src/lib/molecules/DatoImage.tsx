import Image, { ImageLoaderProps } from 'next/image';

type DatoImageProps = {
  className?: string;
  overrideAlt?: string;
  image: {
    mimeType?: string;
    url: string;
    alt?: string;
    width?: number;
    height?: number;
    responsiveImage?: {
      width: number;
      height: number;
      base64: string;
    };
  };
};

const DatoImage = ({ image, className, overrideAlt }: DatoImageProps) => {
  const { alt, url, responsiveImage } = image;

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
    <Image
      alt={overrideAlt ? overrideAlt : alt}
      src={url}
      placeholder="blur"
      blurDataURL={responsiveImage?.base64}
      loader={loader}
      className={className}
      sizes={responsiveImage ? responsiveImage.width + 'px' : image.width + 'px'}
      width={responsiveImage ? responsiveImage.width : image.width}
      height={responsiveImage ? responsiveImage.height : image.height}
    />
  );
};

export { DatoImage };

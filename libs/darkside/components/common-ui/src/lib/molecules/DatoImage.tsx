import Image, { ImageLoaderProps } from 'next/image';

const DatoImage = ({ image, className }) => {
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
      alt={alt}
      src={url}
      placeholder="blur"
      blurDataURL={image.responsiveImage.base64}
      loader={loader}
      className={className}
      sizes={responsiveImage ? responsiveImage.width + 'px' : image.width + 'px'}
      width={responsiveImage ? responsiveImage.width : image.width}
      height={responsiveImage ? responsiveImage.height : image.height}
    />
  );
};

export default DatoImage;

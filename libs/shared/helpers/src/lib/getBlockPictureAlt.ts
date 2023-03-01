type GetBlockPictureAltProps = {
  image?:
    | {
        imageAlt?: string;
        alt?: string;
        url: string;
        responsiveImage: {
          width: number;
          height: number;
        };
      }
    | { width?: number; height?: number; url?: string; alt?: string }
    | Record<string, never>;
  desktopImage?:
    | {
        url: string;
        alt?: string;
        width?: number;
        height?: number;
        responsiveImage?: {
          width: number;
          height: number;
          base64: string;
        };
      }
    | Record<string, never>;
  mobileImage?:
    | {
        url: string;
        alt?: string;
        width?: number;
        height?: number;
        responsiveImage?: {
          width: number;
          height: number;
          base64: string;
        };
      }
    | Record<string, never>;
  title?: string;
};

const getBlockPictureAlt = ({ image = {}, desktopImage = {}, mobileImage = {}, title = '' }: GetBlockPictureAltProps) => {
  const { alt: imageAlt } = image;
  const { alt: desktopAlt } = desktopImage;
  const { alt: mobileAlt } = mobileImage;

  return imageAlt || desktopAlt || mobileAlt || title;
};

export { getBlockPictureAlt };

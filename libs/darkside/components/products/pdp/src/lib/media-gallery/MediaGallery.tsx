import Image, { ImageLoaderProps } from 'next/image';
import styled from 'styled-components';

enum MimeTypes {
  ImageJpeg = 'image/jpeg',
  VideoMP4 = 'video/mp4',
}

interface MediaAsset {
  id: string;
  url: string;
  alt?: string;
  mimeType: MimeTypes;
}

interface MediaGalleryProps {
  assets: MediaAsset[]; // define Asset (from DATO)
}

const MediaGalleryStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: dense;
  gap: 6px;
  width: 100%;
`;

function MediaGallery({ assets }: MediaGalleryProps) {
  return (
    assets && (
      <MediaGalleryStyles>
        {assets.map((asset) => (
          <MediaAsset key={asset.id} type={asset.mimeType} asset={asset} />
        ))}
      </MediaGalleryStyles>
    )
  );
}

export { MediaGallery };

interface MediaAsset {
  type: MimeTypes;
  asset: MediaAsset;
  customData?: {
    sprite?: boolean;
    mobile?: boolean;
  };
}

function MediaAsset({ type, asset }) {
  switch (type) {
    case MimeTypes.ImageJpeg: {
      if (asset.customData?.sprite) {
        return <SpriteSpinner sprite={asset} />;
      }

      return <ImageAsset image={asset} />;
    }
    case MimeTypes.VideoMP4: {
      return <VideoAsset video={asset} />;
    }
    default: {
      // Unexpected mime type provided
      return null;
    }
  }
}

interface ImageAsset {
  alt?: string;
  url: string;
  width: number;
  height: number;
}

const ImageAssetStyles = styled.div`
  aspect-ratio: 1/1;
  position: relative;
`;

function ImageAsset({ image }) {
  const { alt, url } = image;

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
    <ImageAssetStyles>
      <Image
        alt={alt}
        src={url}
        placeholder="blur"
        blurDataURL={image.responsiveImage.base64}
        layout="fill"
        style={{ objectFit: 'cover' }}
        loader={loader}
      />
    </ImageAssetStyles>
  );
}

function VideoAsset({ video }) {
  console.log('VIDEO ASSET', video);

  //return <div>VIDEO</div>;
  return null;
}
function SpriteSpinner({ sprite }) {
  console.log('SPRITE', sprite);

  // return <div>SPRITE SPINNER</div>;
  return null;
}

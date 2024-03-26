import { DIAMOND_VIDEO_BASE_URL } from '@diamantaire/shared/constants';
import { getNumericalLotId } from '@diamantaire/shared-diamond';
import Image from 'next/image';
import { useState } from 'react';

type DiamondVideoThumbImageProps = {
  lotId: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fallbackSrc?: string;
};

const DiamondVideoThumbImage = ({
  lotId,
  alt,
  className,
  width = 400,
  height = 400,
  fallbackSrc,
}: DiamondVideoThumbImageProps) => {
  const numericalLotId = getNumericalLotId(lotId);
  const src = `${DIAMOND_VIDEO_BASE_URL}/${numericalLotId}-thumb.jpg`;
  const [diamondImageSrc, setDiamondImageSrc] = useState(src);
  const [errorTriggered, setErrorTriggered] = useState(false);

  // if image fails to load, load generic image
  const onImageLoadError = () => {
    // ensure we only set the fallback image once
    if (!errorTriggered) {
      if (fallbackSrc) {
        setDiamondImageSrc(fallbackSrc);
      }
      setErrorTriggered(true);
    }
  };

  return (
    <Image
      src={diamondImageSrc}
      alt={alt}
      width={width}
      height={height}
      sizes="100%"
      className={className}
      loader={diamondImageLoader}
      onError={onImageLoadError}
      unoptimized
    />
  );
};

function diamondImageLoader({ src }: { src: string }) {
  return src;
}

export { DiamondVideoThumbImage };

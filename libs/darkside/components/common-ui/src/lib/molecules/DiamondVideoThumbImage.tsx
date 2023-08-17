import { DIAMOND_VIDEO_BASE_URL } from '@diamantaire/shared/constants';
import { getNumericalLotId } from '@diamantaire/shared-diamond';
import Image from 'next/image';

type DiamondVideoThumbImageProps = {
  lotId: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
};

const DiamondVideoThumbImage = ({ lotId, alt, className, width = 400, height = 400 }: DiamondVideoThumbImageProps) => {
  const numericalLotId = getNumericalLotId(lotId);
  const src = `${DIAMOND_VIDEO_BASE_URL}/${numericalLotId}-thumb.jpg`;

  return <Image src={src} alt={alt} width={width} height={height} sizes="100%" className={className} />;
};

export { DiamondVideoThumbImage };

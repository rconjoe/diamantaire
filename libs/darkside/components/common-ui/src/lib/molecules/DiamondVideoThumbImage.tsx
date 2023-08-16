import Image from 'next/image';

type DiamondVideoThumbImageProps = {
  lotId: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
};

const DiamondVideoThumbImage = ({ lotId, alt, className, width = 400, height = 400 }: DiamondVideoThumbImageProps) => {
  const mutatedLotId = lotId.replace(/F/g, '');
  const src = `https://videos.diamondfoundry.com/${mutatedLotId}-thumb.jpg`;

  return <Image src={src} alt={alt} width={width} height={height} sizes="100%" className={className} />;
};

export { DiamondVideoThumbImage };

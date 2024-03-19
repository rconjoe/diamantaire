import { generateDiamondImageUrl } from '@diamantaire/shared/helpers';
import Image from 'next/image';

interface DiamondImageProps {
  diamondType?: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
}

const DiamondImage = ({ diamondType, className, style, width = 0, height = 0 }: DiamondImageProps) => {
  const src = generateDiamondImageUrl(diamondType);

  return (
    <Image
      style={style}
      alt={diamondType}
      className={className}
      src={src}
      width={width}
      height={height}
      sizes="100vw"
      title={diamondType}
      objectFit="contain"
      layout="responsive"
    />
  );
};

export default DiamondImage;

export { DiamondImage };

import { generateDiamondImageUrl } from '@diamantaire/shared/helpers';
import Image from 'next/image';

interface DiamondImageProps {
  diamondType?: string;
  className?: string;
  style?: React.CSSProperties;
}

const DiamondImage = ({ diamondType, className, style }: DiamondImageProps) => {
  const src = generateDiamondImageUrl(diamondType);

  return <Image style={style} alt={diamondType} className={className} src={src} width={0} height={0} sizes="100vw" />;
};

export default DiamondImage;

export { DiamondImage };

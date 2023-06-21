import { generateDiamondImageUrl } from '@diamantaire/shared/helpers';
import Image from 'next/image';

interface DiamondImageProps {
  diamondType?: string;
  className?: string;
}

const DiamondImage = ({ diamondType, className }: DiamondImageProps) => {
  const src = generateDiamondImageUrl(diamondType);

  return <Image alt={diamondType} className={className} src={src} width={0} height={0} sizes="100vw" />;
};

export default DiamondImage;

export { DiamondImage };

import Image from 'next/image';

import { BaseIconType } from './types';

const BaseIcon = ({ image, alt, loading }: BaseIconType) => {
  return <Image src={image} alt={alt ? alt : ''} loading={loading} />;
};

export default BaseIcon;

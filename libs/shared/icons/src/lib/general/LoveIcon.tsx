import loveIcon from '../../assets/love-icon.png';
import BaseIcon from '../BaseIcon';
import { IconType } from '../types';

const LoveIcon = ({ alt, loading }: IconType) => {
  return <BaseIcon image={loveIcon} alt={alt} loading={loading} />;
};

export { LoveIcon };

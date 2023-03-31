import tiktokIcon from '../../assets/social/tiktok-icon.png';
import BaseIcon from '../BaseIcon';
import { IconType } from '../types';

const TiktokIcon = ({ alt, loading }: IconType) => {
  return <BaseIcon image={tiktokIcon} alt={alt} loading={loading} />;
};

export { TiktokIcon };

import instagramIcon from '../../assets/social/instagram-icon.png';
import BaseIcon from '../BaseIcon';
import { IconType } from '../types';

const InstagramIcon = ({ alt, loading }: IconType) => {
  return <BaseIcon image={instagramIcon} alt={alt} loading={loading} />;
};

export { InstagramIcon };

import pinterestIcon from '../../assets/social/pinterest-icon.png';
import BaseIcon from '../BaseIcon';
import { IconType } from '../types';

const PinterestIcon = ({ alt, loading }: IconType) => {
  return <BaseIcon image={pinterestIcon} alt={alt} loading={loading} />;
};

export { PinterestIcon };

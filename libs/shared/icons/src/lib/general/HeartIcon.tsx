import heartIcon from '../../assets/heart-icon.png';
import BaseIcon from '../BaseIcon';
import { IconType } from '../types';

const HeartIcon = ({ alt, loading }: IconType) => {
  return <BaseIcon image={heartIcon} alt={alt} loading={loading} />;
};

export { HeartIcon };

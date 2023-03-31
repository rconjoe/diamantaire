import facebookIcon from '../../assets/social/facebook-icon.png';
import BaseIcon from '../BaseIcon';
import { IconType } from '../types';

const FacebookIcon = ({ alt, loading }: IconType) => {
  return <BaseIcon image={facebookIcon} alt={alt} loading={loading} />;
};

export { FacebookIcon };

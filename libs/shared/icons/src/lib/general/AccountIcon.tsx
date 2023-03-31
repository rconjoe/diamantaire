import accountImage from '../../assets/account-icon.png';
import BaseIcon from '../BaseIcon';
import { IconType } from '../types';

const AccountIcon = ({ alt, loading }: IconType) => {
  return <BaseIcon image={accountImage} alt={alt} loading={loading} />;
};

export { AccountIcon };

import shoppingBagIcon from '../../assets/shopping-bag-icon.png';
import BaseIcon from '../BaseIcon';
import { IconType } from '../types';

const ShoppingBagIcon = ({ alt, loading }: IconType) => {
  return <BaseIcon image={shoppingBagIcon} alt={alt} loading={loading} />;
};

export { ShoppingBagIcon };

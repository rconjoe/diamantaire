import searchIcon from '../../assets/search-icon.png';
import BaseIcon from '../BaseIcon';
import { IconType } from '../types';

const SearchIcon = ({ alt, loading }: IconType) => {
  return <BaseIcon image={searchIcon} alt={alt} loading={loading} />;
};

export { SearchIcon };

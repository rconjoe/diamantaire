import emptyCalendarImage from '../../assets/empty-calendar-icon.png';
import BaseIcon from '../BaseIcon';
import { IconType } from '../types';

const EmptyCalendarIcon = ({ alt, loading }: IconType) => {
  return <BaseIcon image={emptyCalendarImage} alt={alt} loading={loading} />;
};

export { EmptyCalendarIcon };

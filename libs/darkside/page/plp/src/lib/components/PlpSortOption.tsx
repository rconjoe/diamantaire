import { clsx } from 'clsx';

export type PlpBasicFieldSortOption = {
  id: string;
  label: string;
  field: string;
  isDescendingOrder: boolean;
};

export type SortProperties = {
  id: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
};

export type PlpSortOptionProps = PlpBasicFieldSortOption & {
  isSelected: boolean;
};

const PlpSortOption: React.FC<PlpSortOptionProps> = ({ id, label, isSelected }) => {
  return (
    <option key={id} value={id} className={clsx('sort-option', { '-selected': isSelected })}>
      {label}
    </option>
  );
};

export { PlpSortOption };

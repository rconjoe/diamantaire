export interface OptionItemProps {
  id: string;
  value?: string;
  valueLabel?: string;
  isSelected?: boolean;
}

export interface OptionItemContainerProps {
  option: OptionItemProps;
  optionType: string;
  isSelected: boolean;
  onClick: () => void;
  isLink?: boolean;
  valueLabel: string;
}

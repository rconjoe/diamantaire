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
  setProductSlug: (_value: string) => void;
  areDiamondShapesHorizontal?: boolean;
  selectedConfiguration?: { [key: string]: string };
  productType?: string;
}

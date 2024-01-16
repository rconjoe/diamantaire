import { metalTypeAsConst } from '@diamantaire/shared/constants';

type ProductTitleProps = {
  title: string;
  diamondType: string;
  productType: string;
  metal?: string;
  enableMetal?: boolean;
  selectedLanguageCode: string;
  _t: (string) => void;
};

// takes a string, and capitalizes the first letter of each word
export function capitalizeFirstLetter(string) {
  if (!string) {
    return '';
  }

  return string
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function createLongProductTitle(props: ProductTitleProps): string {
  const { title, diamondType, productType, metal, enableMetal = false, selectedLanguageCode, _t } = props;
  let longTitle = title;

  // Check if the product type is 'Engagement Ring' and diamondType is provided
  if (productType === 'Engagement Ring' && diamondType) {
    switch (selectedLanguageCode) {
      case 'en':
        longTitle += ` ${_t(diamondType)} ${capitalizeFirstLetter(_t(productType))}`;
        if (enableMetal) {
          longTitle += ` in ${_t(metalTypeAsConst[metal])}`;
        }
        break;

      case 'de':
        longTitle += ` ${_t(productType)} ${_t(diamondType)}`;
        break;

      case 'es':
      case 'fr':
        longTitle += ` ${_t(diamondType)}`;
        break;
    }
  }

  return longTitle;
}

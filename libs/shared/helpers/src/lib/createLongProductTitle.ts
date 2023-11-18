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

export function createLongProductTitle(props: ProductTitleProps) {
  const { title, diamondType, productType, metal, enableMetal = false, selectedLanguageCode, _t } = props;
  let longTitle = title;

  console.log('createLongProductTitle', title, diamondType, productType, selectedLanguageCode, enableMetal, _t);

  // English
  if (selectedLanguageCode === 'en' && productType === 'Engagement Ring' && diamondType) {
    longTitle += ` ${_t(diamondType)} ${_t(productType)} ${enableMetal ? 'in ' + _t(metalTypeAsConst[metal]) : ''}`;
  }

  // German
  if (selectedLanguageCode === 'de' && productType === 'Engagement Ring' && diamondType) {
    longTitle += ` ${_t(productType)} ${_t(diamondType)}`;
  }

  // French/Spanish
  if ((selectedLanguageCode === 'es' || selectedLanguageCode === 'fr') && productType === 'Engagement Ring' && diamondType) {
    longTitle += `  ${_t(diamondType)}`;
  }

  return longTitle;
}

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
  // split the string into an array of words
  const words = string.split(' ');

  // iterate through the array of words
  for (let i = 0; i < words.length; i++) {
    // split the word into an array of letters
    const letters = words[i].split('');

    // capitalize the first letter of the word
    letters[0] = letters[0].toUpperCase();

    // join the array of letters back into a word
    words[i] = letters.join('');
  }

  // join the array of words back into a string
  return words.join(' ');
}

export function createLongProductTitle(props: ProductTitleProps) {
  const { title, diamondType, productType, metal, enableMetal = false, selectedLanguageCode, _t } = props;
  let longTitle = title;

  // English
  if (selectedLanguageCode === 'en' && productType === 'Engagement Ring' && diamondType) {
    longTitle += ` ${_t(diamondType)} ${capitalizeFirstLetter(_t(productType))} ${
      enableMetal ? 'in ' + _t(metalTypeAsConst[metal]) : ''
    }`;
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

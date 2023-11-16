import { useTranslations } from '@diamantaire/darkside/data/hooks';
import { parseValidLocale } from '@diamantaire/shared/constants';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const ProductTitleStyles = styled.h1`
  font-weight: 500;
  font-size: 2.8rem;
  line-height: 1.1;
  margin: 0 0 1rem;
`;

export function ProductTitle({ title, productType, diamondType }) {
  const { locale } = useRouter();
  const { _t } = useTranslations(locale);
  const { languageCode: selectedLanguageCode } = parseValidLocale(locale);
  const refinedTitle = createLongProductTitle(title, diamondType);

  function createLongProductTitle(title, diamondType) {
    let longTitle = title;

    // English
    if (selectedLanguageCode === 'en' && productType === 'Engagement Ring' && diamondType) {
      longTitle += ` ${_t(diamondType)} ${_t(productType)}`;
    }

    // German
    if (selectedLanguageCode === 'de' && productType === 'Engagement Ring' && diamondType) {
      longTitle += ` ${_t(productType)} ${_t(diamondType)}`;
    }

    // French/Spanish
    if (
      (selectedLanguageCode === 'es' || selectedLanguageCode === 'fr') &&
      productType === 'Engagement Ring' &&
      diamondType
    ) {
      longTitle += `  ${_t(diamondType)}`;
    }

    return longTitle;
  }

  return <ProductTitleStyles>{refinedTitle}</ProductTitleStyles>;
}

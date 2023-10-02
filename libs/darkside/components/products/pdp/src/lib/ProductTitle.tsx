import { useTranslations } from '@diamantaire/darkside/data/hooks';
import { parseValidLocale } from '@diamantaire/shared/constants';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const ProductTitleStyles = styled.h1`
  font-weight: 500;
  font-size: 2.8rem;
  line-height: 1.1;
  margin: 0 0 1rem;
  text-transform: capitalize;
`;

export function ProductTitle({ title, productType, diamondType }) {
  const { locale } = useRouter();
  const { _t } = useTranslations(locale);
  const { languageCode: selectedLanguageCode } = parseValidLocale(locale);
  const refinedTitle = createLongProductTitle(title, diamondType);

  function createLongProductTitle(title, diamondType) {
    const longTitle =
      title + ' ' + _t(diamondType) + ' ' + (selectedLanguageCode && selectedLanguageCode === 'en' ? _t(productType) : '');

    return longTitle;
  }

  // use product title composition logic;
  return <ProductTitleStyles>{refinedTitle}</ProductTitleStyles>;
}

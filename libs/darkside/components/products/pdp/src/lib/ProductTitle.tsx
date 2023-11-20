import { useTranslations } from '@diamantaire/darkside/data/hooks';
import { parseValidLocale } from '@diamantaire/shared/constants';
import { capitalizeFirstLetter, createLongProductTitle, replacePlaceholders } from '@diamantaire/shared/helpers';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const ProductTitleStyles = styled.h1`
  font-weight: 500;
  font-size: 2.2rem;
  line-height: 1.1;
  margin: 0 0 1rem;

  @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
    font-size: 2.8rem;
  }
`;

export function ProductTitle({ title, productType, diamondType, override }) {
  const { locale } = useRouter();
  const { _t } = useTranslations(locale);
  const { languageCode: selectedLanguageCode } = parseValidLocale(locale);
  const refinedTitle = createLongProductTitle({ title, diamondType, productType, selectedLanguageCode, _t });
  let refinedOverride = replacePlaceholders(override, ['%%diamond_type%%'], [_t(diamondType)]).toString();

  refinedOverride = replacePlaceholders(
    refinedOverride,
    ['%%product_type%%'],
    [capitalizeFirstLetter(_t(productType))],
  ).toString();

  return <ProductTitleStyles>{override && override !== '' ? refinedOverride : refinedTitle}</ProductTitleStyles>;
}

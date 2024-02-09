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
    padding: 0 4.5rem 0 0;
  }
`;

type ProductTitleProps = {
  title: string;
  productType: string;
  diamondType: string;
  override?: string;
  className?: string;
};

export function ProductTitle({ title, productType, diamondType, override, className }: ProductTitleProps) {
  const { locale } = useRouter();
  const { _t } = useTranslations(locale, ['DIAMOND_SHAPES', 'PRODUCT_TYPES']);
  const { languageCode: selectedLanguageCode } = parseValidLocale(locale);
  const refinedTitle = createLongProductTitle({ title, diamondType, productType, selectedLanguageCode, _t });
  let refinedOverride = replacePlaceholders(override, ['%%diamond_type%%'], [_t(diamondType)]).toString();

  refinedOverride = replacePlaceholders(
    refinedOverride,
    ['%%product_type%%'],
    [capitalizeFirstLetter(_t(productType))],
  ).toString();

  return (
    <ProductTitleStyles className={className}>
      {override && override !== '' ? refinedOverride : refinedTitle}
    </ProductTitleStyles>
  );
}

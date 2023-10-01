import { useTranslations } from '@diamantaire/darkside/data/hooks';
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
  const refinedTitle = createLongProductTitle(title, productType, diamondType);

  // DiamondType is not being translated
  function createLongProductTitle(title, productType, diamondType) {
    const longTitle = title + ' ' + _t(diamondType) + ' ';

    return longTitle;
  }

  // use product title composition logic;
  return <ProductTitleStyles>{refinedTitle}</ProductTitleStyles>;
}

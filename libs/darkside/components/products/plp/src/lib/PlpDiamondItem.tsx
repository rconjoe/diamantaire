import { DiamondVideoThumbImage } from '@diamantaire/darkside/components/common-ui';
import { useTranslations } from '@diamantaire/darkside/data/hooks';
import { getFormattedPrice } from '@diamantaire/shared/constants';
import { generateGenericDiamondImageUrl } from '@diamantaire/shared/helpers';
import { ListPageDiamondItem, DiamondLink } from '@diamantaire/shared-diamond';
import { useRouter } from 'next/router';
import styled from 'styled-components';

type PlpDiamondItemProps = {
  product: ListPageDiamondItem;
};

const PlpDiamondItemStyles = styled.div`
  .plp-title {
    margin-top: 1rem;
    font-size: var(--font-size-xxsmall);
  }
  .primary-image {
    aspect-ratio: 1;
    object-fit: cover;
  }
`;

const PlpDiamondItem = ({ product }: PlpDiamondItemProps) => {
  const router = useRouter();
  const { _t } = useTranslations();
  const { carat, diamondType, cut, color, clarity, price, handle } = product;
  const title = `${carat.toFixed(2)} carat, ${_t(diamondType)} | ${_t(cut)}, ${_t(color)}, ${_t(clarity)} | ${getFormattedPrice(
    price,
    router.locale,
  )}`;

  const genericDiamondImage = generateGenericDiamondImageUrl(diamondType);

  return (
    <PlpDiamondItemStyles>
      <DiamondLink handle={handle}>
        <DiamondVideoThumbImage
          lotId={product.lotId}
          alt={title}
          className="primary-image"
          fallbackSrc={genericDiamondImage}
        />
        <div className="plp-title">{title}</div>
      </DiamondLink>
    </PlpDiamondItemStyles>
  );
};

export { PlpDiamondItem };

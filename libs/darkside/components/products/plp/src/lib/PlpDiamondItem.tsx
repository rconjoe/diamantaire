import { DiamondVideoThumbImage } from '@diamantaire/darkside/components/common-ui';
import { getFormattedPrice } from '@diamantaire/shared/constants';
import { ListPageDiamondItem, DiamondLink } from '@diamantaire/shared-diamond';
import { useTranslations } from '@diamantaire/darkside/data/hooks';
import { useRouter } from 'next/router';
import styled from 'styled-components';

type PlpDiamondItemProps = {
  product: ListPageDiamondItem;
};

const PlpDiamondItemStyles = styled.div`
  .plp-title {
    margin-top: 2rem;
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
  const title = `${carat} carat, ${_t(diamondType)} | ${_t(cut)}, ${_t(color)}, ${_t(clarity)} | ${getFormattedPrice(price, router.locale)}`;

  return (
    <PlpDiamondItemStyles>
      <DiamondLink handle={handle}>
        <DiamondVideoThumbImage lotId={product.lotId} alt={title} className="primary-image" />
        <div className="plp-title">{title}</div>
      </DiamondLink>
    </PlpDiamondItemStyles>
  );
};

export { PlpDiamondItem };

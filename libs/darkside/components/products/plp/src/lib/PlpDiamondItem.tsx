import { DiamondVideoThumbImage } from '@diamantaire/darkside/components/common-ui';
import { getFormattedPrice } from '@diamantaire/shared/constants';
import { ListPageDiamondItem, DiamondLink } from '@diamantaire/shared-diamond';
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

function capitalizeFirstLetter(str) {
  const words = str.split('-');

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }

  return words.join('-');
}

const PlpDiamondItem = ({ product }: PlpDiamondItemProps) => {
  const router = useRouter();
  const { carat, diamondType, cut, color, clarity, price, handle } = product;
  const title = `${carat} carat, ${capitalizeFirstLetter(diamondType)} | ${cut}, ${color}, ${clarity} | ${getFormattedPrice(
    price,
    router.locale,
  )}`;

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

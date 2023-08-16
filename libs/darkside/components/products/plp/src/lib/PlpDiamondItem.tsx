import { DiamondVideoThumbImage } from '@diamantaire/darkside/components/common-ui';
import { getFormattedPrice } from '@diamantaire/shared/constants';
import { ListPageDiamondItem } from '@diamantaire/shared-diamond';
import Link from 'next/link';
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
    object-fit: 'cover';
  }
`;

const PlpDiamondItem = ({ product }: PlpDiamondItemProps) => {
  const router = useRouter();
  const { carat, diamondType, cut, color, clarity, price, handle } = product;
  const title = `${carat} carat, ${diamondType} | ${cut}, ${color}, ${clarity} | ${getFormattedPrice(price, router.locale)}`;
  const mutatedLotId = product.lotId.replace(/F/g, '');

  return (
    <PlpDiamondItemStyles>
      <Link href={`/diamonds/d/${handle}`}>
        <DiamondVideoThumbImage lotId={mutatedLotId} alt={title} className="primary-image" />
        <div className="plp-title">{title}</div>
      </Link>
    </PlpDiamondItemStyles>
  );
};

export { PlpDiamondItem };

import { getFormattedPrice } from '@diamantaire/shared/constants';
import { ListPageItemWithConfigurationVariants } from '@diamantaire/shared-product';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';

import { PlpProductVariant } from './PlpProductVariant';

const PlpProductItemStyles = styled.div`
  .metal-selector {
    ul {
      li {
        margin-right: 5px;
        &:last-child {
          margin-right: 0px;
        }
        button {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          border: 1px solid #d2dbde;
          position: relative;
          overflow: hidden;
          background-color: transparent;
          cursor: pointer;

          &.selected {
            border: 1px solid var(--color-teal);
          }

          &::after {
            content: '';
            position: absolute;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
            transform: scale(0.75);
            border-radius: 50%;
          }

          &.sterling-silver::after {
            background: linear-gradient(138deg, #d2d2d0 0%, #f7f7f7 50%, #c9cac8 100%);
          }

          &.yellow-gold::after {
            background-color: #c8ab6e;
          }

          &.white-gold::after {
            background: linear-gradient(135deg, #fefefe, #cecece);
          }

          &.rose-gold::after {
            background: #ceac8b;
          }
        }
      }
    }
  }
`;

const PlpProductItem = ({ product }: { product: ListPageItemWithConfigurationVariants }) => {
  const { defaultId, variants, metal } = product;
  const [selectedId, setSelectedId] = useState(defaultId);
  const selectedVariant = variants[selectedId];

  return (
    <PlpProductItemStyles>
      <PlpProductVariant variant={selectedVariant} />
      <div className="metal-selector">
        <ul className="list-unstyled flex">
          {metal?.map((option) => (
            <li key={option.id}>
              <button
                onClick={() => {
                  setSelectedId(option.id);
                }}
                className={option.value === selectedVariant.configuration.metal ? 'selected ' + option.value : option.value}
              ></button>
            </li>
          ))}
        </ul>
      </div>
    </PlpProductItemStyles>
  );
};

export type ListPageDiamondItem = {
  defaultId: string;
  carat: number;
  cut: string;
  diamondType: string;
  clarity: string;
  color: string;
  price: number;
  lotId: string;
  dfCertificateUrl: string;
  variantId: string;
  handle: string;
};

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

type DiamondVideoThumbImageProps = {
  lotId: string;
  alt: string;
  className?: string;
};

const DiamondVideoThumbImage = ({ lotId, alt, className }: DiamondVideoThumbImageProps) => {
  const mutatedLotId = lotId.replace(/F/g, '');
  const src = `https://videos.diamondfoundry.com/${mutatedLotId}-thumb.jpg`;

  return <Image src={src} alt={alt} width={400} height={400} sizes="100%" className={className} />;
};

type FormattedPriceProps = {
  priceInCents: number;
  locale: string;
};

export const FormattedPrice = ({ priceInCents, locale = 'en-US' }: FormattedPriceProps) => {
  const formattedPrice = getFormattedPrice(priceInCents, locale);

  return <span>{formattedPrice}</span>;
};

export { PlpProductItem, PlpDiamondItem };

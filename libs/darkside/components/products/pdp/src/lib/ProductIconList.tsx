import { DarksideButton, DatoImage, Markdown, SlideOut, UIString } from '@diamantaire/darkside/components/common-ui';
import { useProductIconList } from '@diamantaire/darkside/data/hooks';
import { parseValidLocale } from '@diamantaire/shared/constants';
import { getFormattedShipByDate } from '@diamantaire/shared/helpers';
import { DropHintIcon, InfoIcon } from '@diamantaire/shared/icons';
import { generateProductUrl } from '@diamantaire/shared-product';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';

const ProductIconListContainer = styled.div`
  ul {
    margin: calc(var(--gutter) / 3) 0 calc(var(--gutter) / 2);
    padding: 0;
    list-style: none;

    li {
      display: flex;
      align-items: center;
      font-size: 1.7rem;
      margin-bottom: 0.5rem;

      a {
        display: flex;
        color: var(--color-teal);
        text-decoration: underline;
      }

      .share {
        display: flex;
        align-items: center;
        gap: 1rem;

        button {
          font-size: 1.7rem;
          font-weight: var(--font-weight-normal);
        }

        svg {
          width: 15px;
          height: auto;
        }
      }

      span.icon {
        margin-right: 1rem;
      }

      img {
        max-width: 1.5rem;
      }

      .diamond-info-toggle {
        background-color: transparent;
        border: none;
        padding: 0;

        svg {
          transform: scale(0.6);
          position: relative;
          top: 0.1rem;
        }
      }
    }
    .f .slideout__title {
      font-size: var(--font-size-small);
    }
  }
`;

interface ProductIconListProps {
  productIconListType: string;
  locale: string;
  withDropHint?: boolean;
  handleOpenDropHintModal?: (data: { link: string; image: string }) => void;
  productImageUrl?: string;
  collectionSlug?: string;
  productSlug?: string;
  productType?: string;
}

const ProductIconList = ({
  productIconListType,
  locale,
  productType,
  collectionSlug,
  productSlug,
  productImageUrl,
  withDropHint = false,
  handleOpenDropHintModal,
}: ProductIconListProps) => {
  const [isDiamondSlideoutOpen, setIsDiamondSlideoutOpen] = useState(false);

  const { data: { productIconList } = {} } = useProductIconList(productIconListType, locale);

  const { items } = productIconList || {};

  const slideoutContent = items?.find((item) => item.additionalInfo)?.additionalInfo;

  const link = generateProductUrl(productType, collectionSlug, productSlug);

  return (
    <ProductIconListContainer>
      <ul>
        {items?.map((item, index) => {
          if (item._modelApiKey === 'modular_shipping_product_icon_list_item') {
            return <ShippingListItem item={item} key={`product-icon-li-${index}`} />;
          } else {
            return (
              <IconListItem
                item={item}
                key={`product-icon-li-${index}`}
                setIsDiamondSlideoutOpen={setIsDiamondSlideoutOpen}
              />
            );
          }
        })}

        {withDropHint && (
          <li>
            <div className="share" onClick={() => handleOpenDropHintModal({ link, image: productImageUrl })}>
              <DropHintIcon />
              <DarksideButton colorTheme="teal" type="text-underline">
                <UIString>Drop a Hint</UIString>
              </DarksideButton>
            </div>
          </li>
        )}
      </ul>
      <AnimatePresence>
        {isDiamondSlideoutOpen && (
          <SlideOut title={slideoutContent?.title} width="30%" onClose={() => setIsDiamondSlideoutOpen(false)}>
            <DiamondInfoSlideoutContent slideoutContent={slideoutContent} />
          </SlideOut>
        )}
      </AnimatePresence>
    </ProductIconListContainer>
  );
};

export { ProductIconList };

// Single Icon List Item
const ShippingListItem = ({ item }) => {
  const { shippingText, shippingBusinessDays, shippingBusinessDaysCountryMap, icon } = item || {};

  const { locale } = useRouter();
  const { countryCode } = parseValidLocale(locale);

  const businessDays =
    countryCode === 'US'
      ? shippingBusinessDays
      : shippingBusinessDaysCountryMap?.[countryCode]
      ? shippingBusinessDaysCountryMap?.[countryCode]
      : shippingBusinessDaysCountryMap?.['International'];

  const shippingDate = getFormattedShipByDate(businessDays, locale);

  return (
    <li>
      <span className="icon">
        {icon && <DatoImage image={icon} isSVG={true} overrideAlt={shippingText + ' ' + shippingDate} />}
      </span>
      <span className="font-medium">
        {shippingText} {shippingDate}
      </span>
    </li>
  );
};

// Standard Icon List Item
const IconListItem = ({ item, setIsDiamondSlideoutOpen }) => {
  const { copy, ctaRoute, ctaCopy, icon, additionalInfo } = item || {};

  return (
    <li>
      <span className="icon">{icon && <DatoImage image={icon} isSVG={true} overrideAlt={ctaCopy || copy} />}</span> {copy}{' '}
      {ctaRoute && <Link href={ctaRoute}>{ctaCopy} </Link>}
      {additionalInfo ? (
        <button className="diamond-info-toggle" onClick={() => setIsDiamondSlideoutOpen(true)}>
          <InfoIcon />
        </button>
      ) : (
        ''
      )}
    </li>
  );
};

const DiamondInfoSlideoutContentStyles = styled.div`
  .content {
    h2 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
  }
`;

const DiamondInfoSlideoutContent = ({ slideoutContent }) => {
  const { image, text } = slideoutContent || {};

  return (
    <DiamondInfoSlideoutContentStyles>
      <div className="image">
        <DatoImage image={image} />
      </div>
      <div className="content">{text && <Markdown>{text}</Markdown>}</div>
    </DiamondInfoSlideoutContentStyles>
  );
};

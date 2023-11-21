import { DatoImage, Markdown, SlideOut } from '@diamantaire/darkside/components/common-ui';
import { useProductIconList } from '@diamantaire/darkside/data/hooks';
import { getCountry } from '@diamantaire/shared/helpers';
import { InfoIcon } from '@diamantaire/shared/icons';
import { addBusinessDays, format } from 'date-fns';
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
      margin-bottom: 5px;
      a {
        display: flex;
        color: var(--color-teal);
        text-decoration: underline;
      }

      span.icon {
        margin-right: 10px;
      }

      img {
        max-width: 15px;
      }

      .diamond-info-toggle {
        background-color: transparent;
        border: none;
        padding: 0;

        svg {
          transform: scale(0.6);
          position: relative;
          top: 1px;
        }
      }
    }

    .slideout__title {
      font-size: var(--font-size-small);
    }
  }
`;

const ProductIconList = ({ productIconListType, locale }) => {
  const [isDiamondSlideoutOpen, setIsDiamondSlideoutOpen] = useState(false);
  const { data: { productIconList } = {} } = useProductIconList(productIconListType, locale);
  const { items } = productIconList || {};

  const slideoutContent = items?.find((item) => item.additionalInfo)?.additionalInfo;

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
      </ul>
      <AnimatePresence>
        {isDiamondSlideoutOpen && (
          <SlideOut title={slideoutContent?.title} onClose={() => setIsDiamondSlideoutOpen(false)}>
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

  // Checks if the locale is US, if not, it will check the shippingBusinessDaysCountryMap for the country code based days
  const shippingDate = format(
    addBusinessDays(
      new Date(),
      getCountry(locale) === 'US' ? shippingBusinessDays : shippingBusinessDaysCountryMap?.[getCountry(locale)],
    ),
    'E, MMM d',
  );

  return (
    <li>
      <span className="icon">
        {icon && <DatoImage image={icon} isSVG={true} overrideAlt={shippingText + ' ' + shippingDate} />}
      </span>
      {shippingText} {shippingDate}
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

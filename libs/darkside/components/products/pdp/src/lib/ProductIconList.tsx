import { DarksideButton, DatoImage, Markdown, SlideOut, UIString } from '@diamantaire/darkside/components/common-ui';
import { useProductIconList } from '@diamantaire/darkside/data/hooks';
import { parseValidLocale } from '@diamantaire/shared/constants';
import { getFormattedShipByDate } from '@diamantaire/shared/helpers';
import { DropHintIcon, InfoIcon } from '@diamantaire/shared/icons';
import { generateProductUrl } from '@diamantaire/shared-product';
import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';

const ProductIconListContainer = styled.div`
  ul {
    margin: calc(var(--gutter) / 3) 0 calc(var(--gutter) / 2);
    padding: 0;
    list-style: none;

    &.noVraiDiamond {
      li:first-child {
        margin-bottom: 0px;
      }
    }

    li {
      display: flex;
      align-items: center;
      font-size: 1.7rem;
      margin-bottom: 0;

      &:first-child {
        margin-bottom: -7px;
      }

      &.cfy {
        align-items: flex-start;

        .icon {
          position: relative;
          top: 5px;
        }

        /* need to standardize with new style guide - Sam D. */
        .text {
          font-size: 1.7rem;
        }
      }

      &.shippingAlt {
        margin-top: 0.45rem;
      }

      a {
        display: flex;
        color: var(--color-teal);
        text-decoration: underline;
      }

      span {
        &.details {
          display: block;
          font-weight: 400;
          color: var(--color-dark-grey);
          line-height: 1.3;
          font-size: var(--font-size-xxsmall);
        }
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
        flex: 0 0 14px;
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
  isCfy?: boolean;
  isCaratLessThanFive?: boolean;
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
  isCfy = false,
  isCaratLessThanFive = true,
}: ProductIconListProps) => {
  const [isDiamondSlideoutOpen, setIsDiamondSlideoutOpen] = useState(false);

  const { data: { productIconList } = {} } = useProductIconList(productIconListType, locale);

  const { items } = productIconList || {};

  const slideoutContent = items?.find((item) => item.additionalInfo)?.additionalInfo;

  const link = generateProductUrl(productType, collectionSlug, productSlug);

  const hasVraiCreatedDiamond = items?.some((item) => item.additionalInfo?.id === '142787003');

  console.log('items', items);

  return (
    <ProductIconListContainer>
      <ul
        className={clsx({
          noVraiDiamond: !hasVraiCreatedDiamond,
        })}
      >
        {items?.map((item, index) => {
          if (item._modelApiKey === 'modular_shipping_product_icon_list_item') {
            return (
              <ShippingListItem
                item={item}
                isCfy={isCfy}
                isCaratLessThanFive={isCaratLessThanFive}
                key={`product-icon-li-${index}`}
              />
            );
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
const ShippingListItem = ({ item, isCfy, isCaratLessThanFive }) => {
  const {
    shippingText,
    shippingBusinessDays,
    shippingBusinessDaysCountryMap,
    icon,
    cutForYouShippingBusinessDaysCountryMap,
    cutForYouShippingBusinessDays,
    cutForYouShippingText,
    cutForYouShippingDetails,
    cutForYouReturnPolicyTitle,
    cutForYouReturnPolicyDetails,
    cutForYouReturnPolicyIcon,
  } = item || {};

  const { locale } = useRouter();
  const { countryCode, languageCode } = parseValidLocale(locale);

  const businessDays =
    countryCode === 'US'
      ? shippingBusinessDays
      : shippingBusinessDaysCountryMap?.[countryCode]
      ? shippingBusinessDaysCountryMap?.[countryCode]
      : shippingBusinessDaysCountryMap?.['International'];

  const businessDaysCfy =
    countryCode === 'US'
      ? cutForYouShippingBusinessDays
      : cutForYouShippingBusinessDaysCountryMap?.[countryCode]
      ? cutForYouShippingBusinessDaysCountryMap?.[countryCode]
      : cutForYouShippingBusinessDaysCountryMap?.['International'];

  const shippingDate = getFormattedShipByDate(isCfy ? businessDaysCfy : businessDays, locale);

  return (
    <>
      {/* Shipping */}
      <li
        className={clsx({
          cfy: isCfy ? 'cfy' : '',
          shippingAlt: languageCode === 'es' || languageCode === 'fr',
        })}
      >
        <span className="icon">
          {icon && (
            <DatoImage
              image={icon}
              isSVG={true}
              overrideAlt={(isCfy ? cutForYouShippingText : shippingText) + ' ' + shippingDate}
            />
          )}
        </span>
        <span className="text">
          {isCfy ? cutForYouShippingText : shippingText} {shippingDate}
          {isCfy && <span className="details">{cutForYouShippingDetails}</span>}
        </span>
      </li>
      {/* CFY only - Returns */}
      {isCfy && !isCaratLessThanFive && (
        <li className={isCfy ? 'cfy' : ''}>
          <span className="icon">
            {icon && (
              <DatoImage image={cutForYouReturnPolicyIcon} isSVG={true} overrideAlt={shippingText + ' ' + shippingDate} />
            )}
          </span>
          <span className="text">
            {cutForYouReturnPolicyTitle}
            {isCfy && <span className="details">{cutForYouReturnPolicyDetails}</span>}
          </span>
        </li>
      )}
    </>
  );
};

// Standard Icon List Item
const IconListItem = ({ item, setIsDiamondSlideoutOpen }) => {
  const { copy, ctaRoute, newRoute, ctaCopy, icon, additionalInfo } = item || {};

  return (
    <li>
      <span className="icon">{icon && <DatoImage image={icon} isSVG={true} overrideAlt={ctaCopy || copy} />}</span>{' '}
      {newRoute || ctaRoute ? (
        <a target="_blank" href={newRoute || ctaRoute}>
          {ctaCopy || copy}{' '}
        </a>
      ) : (
        copy
      )}
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

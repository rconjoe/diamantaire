import { DatoImage } from '@diamantaire/darkside/components/common-ui';
import { getCountry } from '@diamantaire/shared/helpers';
import { addBusinessDays, format } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const ProductIconListContainer = styled.ul`
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
      color: var(--color-accent);
      text-decoration: underline;
    }

    span.icon {
      margin-right: 10px;
    }

    img {
      max-width: 15px;
    }
  }
`;

const ProductIconList = ({ items }) => {
  return (
    <ProductIconListContainer>
      {items?.map((item, index) => {
        if (item._modelApiKey === 'modular_shipping_product_icon_list_item') {
          return <ShippingListItem item={item} key={`product-icon-li-${index}`} />;
        } else {
          return <IconListItem item={item} key={`product-icon-li-${index}`} />;
        }
      })}
    </ProductIconListContainer>
  );
};

export default ProductIconList;

// Single Icon List Item
const ShippingListItem = ({ item }) => {
  console.log('shippingitem', item);
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
const IconListItem = ({ item }) => {
  const { copy, ctaRoute, ctaCopy, icon } = item || {};

  return (
    <li>
      <span className="icon">{icon && <DatoImage image={icon} isSVG={true} overrideAlt={ctaCopy || copy} />}</span> {copy}{' '}
      {ctaRoute && <Link href={ctaRoute}>{ctaCopy}</Link>}
    </li>
  );
};

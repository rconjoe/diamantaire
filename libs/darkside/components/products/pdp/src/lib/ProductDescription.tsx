import { Heading, Markdown, UIString } from '@diamantaire/darkside/components/common-ui';
import { ProductSpecProps, useProductSpec, useTranslations } from '@diamantaire/darkside/data/hooks';
import {
  DEFAULT_LOCALE,
  DIAMOND_TYPE_HUMAN_NAMES,
  METALS_IN_HUMAN_NAMES,
  PRODUCT_SPEC_NAMES,
  DIAMOND_SPEC_NAMES,
} from '@diamantaire/shared/constants';
import { replacePlaceholders } from '@diamantaire/shared/helpers';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const ProductDescriptionContainer = styled.div`
  .description__product-details {
    margin: calc(var(--gutter) / 4) 0 calc(var(--gutter) / 3) 0;
  }

  .details-title {
    margin: calc(var(--gutter) / 2) 0 calc(var(--gutter) / 6) 0;
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-xsmall);
    line-height: 1.5;
  }

  p {
    margin: 0 0 2rem;
    line-height: 1.4;
    font-size: 1.7rem;

    &:last-child {
      margin-bottom: 0px;
    }

    &.sub-title {
      font-weight: 500;
      margin-bottom: 1rem;
    }
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    li {
      font-size: 1.7rem;
      margin-bottom: 0.5rem;

      span.small {
        font-size: 1.4rem;
        display: block;
      }
    }
  }

  a {
    color: var(--color-teal);
    text-decoration: underline;
    transition: 0.25s;

    &:hover {
      text-decoration: none;
      opacity: 0.75;
    }
  }
  .description__variant-details {
    p {
      margin-bottom: 1rem;
    }
  }
`;

const ProductDescription = ({
  description,
  productAttributes,
  variantAttributes,
  productSpecId,
  title,
  selectedConfiguration,
}) => {
  const { locale } = useRouter();

  const { productType, shownWithCtwLabel, diamondDescription, styles } = productAttributes || {};

  const {
    // Engagement Rings
    shownWithCtw,
    pdpSubTitle,
    caratWeightOverride,
    // Jewelry

    // Wedding Bands
    bandWidthOverride,
    metalWeightOverride,
    paveCaratWeightOverride,
  } = variantAttributes || {};

  // Product Spec - These are the locale-based labels for the product

  const { data } = useProductSpec(productSpecId, locale) as ProductSpecProps;
  const labels = data?.productSpecLabelCollection?.labels || [];

  const combinedAttributes = { ...productAttributes, ...variantAttributes };

  const createSpecList = (specNames) => {
    return labels
      .filter((label) => specNames.includes(label.specName))
      .map((label) => {
        const value = combinedAttributes[label.specName];

        return value ? { label: label.copy, value } : null;
      })
      .filter((spec) => spec !== null);
  };

  const jewelryProductSpecs = createSpecList(PRODUCT_SPEC_NAMES);
  const diamondSpecs = createSpecList(DIAMOND_SPEC_NAMES);
  const weddingSpecs = labels
    .map((label) => {
      let value = combinedAttributes[label.specName];

      // Check for override values
      if (label.specName === 'metalWeight') {
        value = metalWeightOverride || value;
      } else if (label.specName === 'paveCaratWeight') {
        value = paveCaratWeightOverride || value;
      } else if (label.specName === 'bandWidth') {
        value = bandWidthOverride || value;
      } else if (label.specName === 'caratWeight') {
        value = caratWeightOverride || value;
      }

      return value ? { label: label.copy, value } : null;
    })
    .filter((spec) => spec !== null);

  const renderSpecs = (specs) => {
    return specs.map((spec, index) => {
      if (!spec.value) return null; // Skip specs with empty values

      return (
        <li key={`${productType}-spec-${index}`}>
          {spec.label}: {_t(spec.value)}
        </li>
      );
    });
  };

  const doesCaratWeightDisclosureExist = () => {
    return ['carat', 'caratWeight', 'paveCaratWeight', 'shownWithCenterStone'].some((str) => combinedAttributes[str]);
  };

  const hasDiamondSpec = doesCaratWeightDisclosureExist();

  const renderProductTypeSpecs = () => {
    switch (productType) {
      case 'Engagement Ring':
      case 'Wedding Band':
        return (
          <ul>
            {renderSpecs(weddingSpecs)}
            {(productType === 'Engagement Ring' || hasDiamondSpec) && (
              <li>
                <span className="small">
                  <Link href="/diamond-tolerance">
                    <UIString>For precise weight please see tolerance specs.</UIString>
                  </Link>
                </span>
              </li>
            )}
            {shownWithCtw && (
              <li>
                {_t(shownWithCtwLabel)}: {shownWithCtw}
              </li>
            )}
          </ul>
        );

      default: // jewelry
        return <ul>{renderSpecs(jewelryProductSpecs)}</ul>;
    }
  };

  const generatedSubTitle =
    title +
    ' ' +
    styles?.[0] +
    ' ring in ' +
    selectedConfiguration?.goldPurity +
    ' ' +
    METALS_IN_HUMAN_NAMES[selectedConfiguration?.metal]?.toLowerCase() +
    ' ' +
    ' with a ' +
    DIAMOND_TYPE_HUMAN_NAMES[selectedConfiguration?.diamondType]?.toLowerCase() +
    ' diamond';

  const { _t } = useTranslations(locale);

  const isInUS = locale === DEFAULT_LOCALE;

  const refinedDescription: string = replacePlaceholders(description, ['%%product-name%%'], [title]).toString();

  return (
    description && (
      <ProductDescriptionContainer>
        <Heading type="h2" className="details-title">
          {title && locale !== 'en-US' ? title + ' Details' : title ? title + ' Design' : 'Details'}
        </Heading>

        {pdpSubTitle !== '' ? (
          <p className="sub-title">{pdpSubTitle}</p>
        ) : productType === 'Engagement Ring' && isInUS ? (
          <p className="sub-title">{generatedSubTitle}</p>
        ) : (
          ''
        )}

        <Markdown withStyles={false}>{refinedDescription}</Markdown>

        <div className="description__product-details">
          <ul>{renderProductTypeSpecs()}</ul>
        </div>

        {/* Diamond section usually for Jewelry */}
        {variantAttributes?.shape && variantAttributes?.shape !== 'Shape' && (
          <div className="description__variant-details">
            <Heading type="h4" className="primary">
              {title ? 'VRAI created diamond for ' + title : 'VRAI created diamond'}
            </Heading>
            {diamondDescription && <Markdown withStyles={false}>{diamondDescription}</Markdown>}
            <ul>
              {diamondSpecs.map((spec, index) => (
                <li key={`diamond-spec-${index}`}>{spec.label + ': ' + _t(spec.value)}</li>
              ))}

              <li>
                <span className="small">
                  <Link href="/diamond-tolerance">For precise weight please see tolerance specs.</Link>
                </span>
              </li>
            </ul>
          </div>
        )}
      </ProductDescriptionContainer>
    )
  );
};

export { ProductDescription };

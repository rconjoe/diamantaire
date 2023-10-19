import { Heading, Markdown } from '@diamantaire/darkside/components/common-ui';
import { ProductSpecProps, useProductSpec } from '@diamantaire/darkside/data/hooks';
import { DEFAULT_LOCALE, DIAMOND_TYPE_HUMAN_NAMES, METALS_IN_HUMAN_NAMES } from '@diamantaire/shared/constants';
import { replacePlaceholders } from '@diamantaire/shared/helpers';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
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
    margin: 0 0 20px;
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
      margin-bottom: 5px;

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
      margin-bottom: 10px;
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
  const {
    productType,
    bandWidth: parentProductBandWidth,
    // Depth always comes from parent product
    bandDepth: parentProductBandDepth,
    settingHeight,
    paveCaratWeight,
    metalWeight,
    shownWithCtwLabel,
    diamondDescription,
    styles,
  } = productAttributes || {};

  const {
    origin,
    // Engagement Rings
    clarity,
    color,
    dimensions,
    shape,
    shownWithCtw,
    caratWeightOverride,
    pdpSubTitle,

    // Jewelry
    metal,
    setting,
    closure,
    chainWidth,
    chainLength,

    // Wedding Bands
    bandWidthOverride: variantBandWidth,
    metalWeightOverride,
    paveCaratWeightOverride,
  } = variantAttributes || {};

  // Product Spec - These are the locale-based labels for the product
  const { data } = useProductSpec(productSpecId, 'en_US') as ProductSpecProps;
  const labels = data?.productSpecLabelCollection?.labels;

  let refinedLabels = {};

  labels?.forEach((label) => {
    return (refinedLabels = { ...refinedLabels, [label.specName]: label.copy });
  });

  const diamondLabels = useMemo(
    () => [
      {
        title: 'origin',
        value: origin,
      },
      {
        title: 'shape',
        value: shape,
      },
      {
        title: 'color',
        value: color,
      },
      {
        title: 'clarity',
        value: clarity,
      },
      {
        title: 'diamondSize',
        value: dimensions,
      },
      {
        title: 'carat',
        value: caratWeightOverride,
      },
    ],
    [color, shape, clarity, dimensions, caratWeightOverride, origin],
  );

  const engagementRingLabels = useMemo(
    () => [
      {
        title: 'bandWidth',
        value: parentProductBandWidth,
      },
      {
        title: 'bandDepth',
        value: parentProductBandDepth,
      },
      {
        title: 'settingHeight',
        value: settingHeight,
      },
      {
        title: 'metalWeight',
        value: metalWeight,
      },
      {
        title: 'shownWithCtw',
        value: shownWithCtw,
      },
      {
        title: 'paveCaratWeight',
        value: paveCaratWeight,
      },
    ],
    [parentProductBandDepth, parentProductBandWidth, settingHeight, metalWeight, paveCaratWeight, shownWithCtw],
  );

  const jewelryLabels = useMemo(
    () => [
      {
        title: 'metal',
        value: metal,
      },
      {
        title: 'setting',
        value: setting,
      },
      {
        title: 'closure',
        value: closure,
      },
      {
        title: 'chainWidth',
        value: chainWidth,
      },
      {
        title: 'chainLength',
        value: chainLength,
      },
    ],
    [metal, setting, closure, chainWidth, chainLength],
  );

  const weddingBandLabels = useMemo(() => {
    return [
      {
        title: 'bandWidth',
        value: variantBandWidth || parentProductBandWidth,
      },
      {
        title: 'bandDepth',
        value: parentProductBandDepth,
      },
      {
        title: 'metalWeight',
        value: metalWeightOverride,
      },
      {
        title: 'paveCaratWeight',
        value: paveCaratWeightOverride,
      },
    ];
  }, [variantBandWidth, parentProductBandWidth, parentProductBandDepth, metalWeight]);

  const jewelryProductTypes = ['Necklace', 'Bracelet'];

  const generatedSubTitle =
    title +
    ' ' +
    styles?.[0] +
    ' ring in ' +
    selectedConfiguration?.goldPurity +
    ' ' +
    METALS_IN_HUMAN_NAMES[selectedConfiguration?.metal].toLowerCase() +
    ' ' +
    ' with a ' +
    DIAMOND_TYPE_HUMAN_NAMES[selectedConfiguration?.diamondType].toLowerCase() +
    ' diamond';

  const { locale } = useRouter();

  const isInUS = locale === DEFAULT_LOCALE;

  const refinedDescription: string = replacePlaceholders(description, ['%%product-name%%'], [title]).toString();

  return (
    description && (
      <ProductDescriptionContainer>
        <Heading type="h2" className="details-title">
          {title ? title + ' Design' : 'Details'}
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
          <ul>
            {/* Engagement Ring Fields */}

            {productType === 'Engagement Ring' &&
              engagementRingLabels?.map((label, index) => {
                if (!label.value || (!refinedLabels[label.title] && label.title !== 'shownWithCtw')) return null;

                return (
                  <li key={`er-label-${index}`}>
                    {label.title === 'shownWithCtw'
                      ? `${shownWithCtwLabel}: ${label.value}`
                      : refinedLabels[label.title] + ': ' + label.value}

                    {label.title === 'paveCaratWeight' &&
                      (variantAttributes?.shape === 'Shape' || variantAttributes?.shape === '') && (
                        <span className="small">
                          <Link href="/diamond-tolerance">For precise weight please see tolerance specs.</Link>
                        </span>
                      )}
                  </li>
                );
              })}

            {/* Jewelry Fields */}
            {jewelryProductTypes.includes(productType) &&
              jewelryLabels?.map((label, index) => {
                if (!label.value || !refinedLabels[label.title]) return null;

                return <li key={`jewelry-label-${index}`}>{refinedLabels[label.title] + ': ' + label.value}</li>;
              })}

            {/* Wedding Band Fields */}
            {productType === 'Wedding Band' &&
              weddingBandLabels?.map((label, index) => {
                if (!label.value || !refinedLabels[label.title]) return null;

                return <li key={`jewelry-label-${index}`}>{refinedLabels[label.title] + ': ' + label.value}</li>;
              })}
            {productType === 'Wedding Band' && (
              <li>
                <span className="small">
                  <Link href="/diamond-tolerance">For precise weight please see tolerance specs.</Link>
                </span>
              </li>
            )}
          </ul>
        </div>

        {/* Just for products with potential custom diamonds */}
        {variantAttributes?.shape && variantAttributes?.shape !== 'Shape' && (
          <div className="description__variant-details">
            <Heading type="h4" className="primary">
              {title ? 'VRAI created diamond for ' + title : 'VRAI created diamond'}
            </Heading>
            {diamondDescription && <Markdown withStyles={false}>{diamondDescription}</Markdown>}
            <ul>
              {diamondLabels?.map((label, index) => {
                if (!label.value || !refinedLabels[label.title]) return null;

                return <li key={`jewelry-label-${index}`}>{refinedLabels[label.title] + ': ' + label.value}</li>;
              })}

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

import { Markdown } from '@diamantaire/darkside/components/common-ui';
import { ProductSpecProps, useProductSpec } from '@diamantaire/darkside/data/hooks';
import Link from 'next/link';
import { useMemo } from 'react';
import styled from 'styled-components';

const ProductDescriptionContainer = styled.div`
  .description__product-details {
    margin: calc(var(--gutter) / 4) 0 calc(var(--gutter) / 3) 0;
  }

  h4 {
    margin: calc(var(--gutter) / 2) 0 calc(var(--gutter) / 6) 0;
  }

  p {
    margin: 0;
    line-height: 1.4;
    font-size: 1.7rem;
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
    color: var(--color-accent);
    text-decoration: underline;
    transition: 0.25s;

    &:hover {
      text-decoration: none;
      opacity: 0.75;
    }
  }
`;

const ProductDescription = ({ description, productAttributes, variantAttributes, productSpecId }) => {
  const { bandWidth, bandDepth, settingHeight, paveCaratWeight, metalWeight, shownWithCtwLabel } = productAttributes || {};
  const {
    origin,
    // Rings
    clarity,
    color,
    dimensions,
    shape,
    shownWithCtw,
    caratWeightOverride,

    // Jewelry
    metal,
    setting,
    closure,
    chainWidth,
    chainLength,
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
        value: bandWidth,
      },
      {
        title: 'bandDepth',
        value: bandDepth,
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
        title: 'paveCaratWeight',
        value: paveCaratWeight,
      },
      {
        title: 'shownWithCtw',
        value: shownWithCtw,
      },
    ],
    [bandWidth, bandDepth, settingHeight, metalWeight, paveCaratWeight, shownWithCtw],
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

  return (
    description && (
      <ProductDescriptionContainer>
        <h4>Details</h4>
        <Markdown withStyles={false}>{description}</Markdown>

        <div className="description__product-details">
          <ul>
            {/* Engagement Ring Fields */}

            {engagementRingLabels?.map((label, index) => {
              if (!label.value || (!refinedLabels[label.title] && label.title !== 'shownWithCtw')) return null;

              return (
                <li key={`er-label-${index}`}>
                  {label.title === 'shownWithCtw'
                    ? `${shownWithCtwLabel}: ${label.value}`
                    : refinedLabels[label.title] + ':' + label.value}

                  {label.title === 'paveCaratWeight' && (
                    <span className="small">
                      <Link href="/diamond-tolerance">For precise weight please see tolerance specs.</Link>
                    </span>
                  )}
                </li>
              );
            })}

            {/* Jewelry Fields */}
            {jewelryLabels?.map((label, index) => {
              if (!label.value || !refinedLabels[label.title]) return null;

              return <li key={`jewelry-label-${index}`}>{refinedLabels[label.title] + ':' + label.value}</li>;
            })}
          </ul>
        </div>

        {variantAttributes?.shape && variantAttributes?.shape !== 'Shape' && (
          <div className="description__variant-details">
            <h4>VRAI created diamond</h4>
            <ul>
              {diamondLabels?.map((label, index) => {
                if (!label.value || !refinedLabels[label.title]) return null;

                return <li key={`jewelry-label-${index}`}>{refinedLabels[label.title] + ':' + label.value}</li>;
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

export default ProductDescription;

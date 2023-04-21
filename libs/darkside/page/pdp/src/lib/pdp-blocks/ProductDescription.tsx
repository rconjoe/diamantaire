import { Markdown } from '@diamantaire/darkside/components/common-ui';
import Link from 'next/link';
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

const ProductDescription = ({ description, productAttributes, variantAttributes }) => {
  const { bandWidth, bandDepth, settingHeight, paveCaratWeight, shownWithCtw, metalWeight } = productAttributes || {};
  const { clarity, color, dimensions, origin, shape, caratWeightOverride } = variantAttributes || {};

  return (
    description && (
      <ProductDescriptionContainer>
        <h4>Details</h4>
        <Markdown withStyles={false}>{description}</Markdown>

        <div className="description__product-details">
          <ul>
            <li>Band Width: {bandWidth}</li>
            <li>Band Depth: {bandDepth}</li>
            <li>Setting Height: {settingHeight}</li>
            <li>Gold/Platinum metal weight: {metalWeight}</li>
            <li>
              Pavé carat weight: {paveCaratWeight}{' '}
              <span className="small">
                <Link href="/diamond-tolerance">For precise weight please see tolerance specs.</Link>
              </span>
            </li>
            <li>Shown with center stone {shownWithCtw}</li>
          </ul>
        </div>

        {variantAttributes?.shape && (
          <div className="description__variant-details">
            <h4>VRAI created diamond</h4>
            <ul>
              <li>Origin: {origin}</li>
              <li>Shape: {shape}</li>
              <li>Color: {color}</li>
              <li>Clarity: {clarity}</li>
              <li>Dimensions: {dimensions}</li>
              <li>Carat: {caratWeightOverride}</li>
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

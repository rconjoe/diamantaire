import { ListPageItemWithConfigurationVariants } from '@diamantaire/shared-product';
import { useState } from 'react';
import styled from 'styled-components';

import { PlpProductVariant } from './PlpProductVariant';

const PlpProductItemStyles = styled.div`
  position: relative;
  .metal-selector {
    ul {
      li {
        margin-right: 0.5rem;
        &:last-child {
          margin-right: 0px;
        }
        button {
          height: 2rem;
          width: 2rem;
          border-radius: 50%;
          border: 0.1rem solid #d2dbde;
          position: relative;
          overflow: hidden;
          background-color: transparent;
          cursor: pointer;

          &.selected {
            border: 0.1rem solid var(--color-teal);
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

          &.platinum::after {
            background-color: rgb(200, 200, 200);
          }
        }
      }
    }
  }
`;

type PlpProductItemProps = {
  product: ListPageItemWithConfigurationVariants;
  position: number;
  plpTitle: string;
  builderFlowOverride?: boolean;
  selectSettingForBuilderFlow: () => void;
};

const PlpProductItem = ({
  product,
  position,
  plpTitle,
  selectSettingForBuilderFlow,
  builderFlowOverride,
}: PlpProductItemProps) => {
  const { defaultId, variants, metal, useLowestPrice, lowestPrice } = product;
  const [selectedId, setSelectedId] = useState(defaultId);
  const selectedVariant = variants[selectedId];

  return (
    <PlpProductItemStyles>
      <PlpProductVariant
        variant={selectedVariant}
        position={position}
        plpTitle={plpTitle}
        useLowestPrice={useLowestPrice}
        lowestPrice={lowestPrice}
        label={product?.productLabel?.title || null}
        selectSettingForBuilderFlow={selectSettingForBuilderFlow}
        builderFlow={builderFlowOverride}
      />
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

export { PlpProductItem };

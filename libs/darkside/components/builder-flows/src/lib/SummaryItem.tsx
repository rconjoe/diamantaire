import { DarksideButton, DatoImage, UIString } from '@diamantaire/darkside/components/common-ui';
import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import { DIAMOND_TYPE_HUMAN_NAMES, bandAccentTypeAsConst } from '@diamantaire/shared/constants';
import { makeCurrency } from '@diamantaire/shared/helpers';
import { getNumericalLotId } from '@diamantaire/shared-diamond';
import React, { useContext } from 'react';
import styled from 'styled-components';

const SummaryItemStyles = styled.div`
  .summary-item {
    display: flex;
    align-items: center;
    padding-bottom: 1rem;

    .item__image {
      flex: 0 0 12rem;
      margin-right: 2rem;
    }

    .item__content {
      h4 {
        font-size: 1.6rem;
        margin-bottom: 0.5rem;
      }

      p {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        color: #777;
      }

      ul {
        margin: 0;
        padding: 0;
        list-style: none;
        li {
          font-size: 1.6rem;
          color: #777;
          span {
            margin-right: 0.5rem;
            font-weight: bold;
            color: #000;
          }
        }
      }
    }
    .item__edit-toggle {
      flex: 1;
      margin-left: 1rem;
      text-align: right;

      .price {
        margin-bottom: 0.5rem;
      }

      a,
      button {
        font-size: 1.4rem;
      }
    }
  }
`;

type SummaryItemProps = {
  item: any;
  itemType?: 'product' | 'diamond';
  showPrice: boolean;
  modifyIndex: number;
};

const SummaryItem = ({ item, itemType = 'product', showPrice = false, modifyIndex }: SummaryItemProps) => {
  const { productTitle, image, metal, price, bandAccent, diamondType, clarity, carat, cut, color } = item || {};
  const { updateStep } = useContext(BuilderProductContext);

  let src = null;

  if (item.lotId) {
    const mutatedLotId = getNumericalLotId(item?.lotId);

    src = `https://videos.diamondfoundry.com/${mutatedLotId}-thumb.jpg`;
  }

  return (
    <SummaryItemStyles>
      {itemType === 'diamond' ? (
        <div className="summary-item summary-item--diamond">
          <div className="item__image">{src && <img src={src} alt="" />} </div>
          <div className="item__content">
            <h4>{DIAMOND_TYPE_HUMAN_NAMES[diamondType]}</h4>
            <ul>
              <li>
                <UIString>{carat.toString()}</UIString>ct
              </li>
              <li>
                <UIString>{clarity}</UIString>
              </li>
              <li>
                <UIString>{cut}</UIString>
              </li>
              <li>
                <UIString>{color}</UIString>
              </li>
            </ul>
          </div>
          <div className="item__edit-toggle">
            {showPrice && (
              <div className="price">
                <p>{makeCurrency(price, 'en-US', 'USD')}</p>
              </div>
            )}
            <DarksideButton type="underline" colorTheme="teal" onClick={() => updateStep(modifyIndex)}>
              Modify
            </DarksideButton>
          </div>
        </div>
      ) : (
        <div className="summary-item">
          <div className="item__image">{src ? <img src={src} alt="" /> : image ? <DatoImage image={image} /> : ''}</div>
          <div className="item__content">
            <h4>{productTitle}</h4>
            <p>
              <UIString>{metal}</UIString>
            </p>
            <p>
              <UIString>{bandAccentTypeAsConst[bandAccent]}</UIString>
            </p>
          </div>
          <div className="item__edit-toggle">
            {showPrice && (
              <div className="price">
                <p>{makeCurrency(price, 'en-US', 'USD')}</p>
              </div>
            )}
            <DarksideButton type="underline" colorTheme="teal" onClick={() => updateStep(modifyIndex)}>
              Modify
            </DarksideButton>
          </div>
        </div>
      )}
    </SummaryItemStyles>
  );
};

export default SummaryItem;

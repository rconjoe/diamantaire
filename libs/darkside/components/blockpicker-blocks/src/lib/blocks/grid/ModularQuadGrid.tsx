import { UniLink } from '@diamantaire/darkside/core';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ModularQuadGridContainer } from './ModularQuadGrid.style';
import Button from '../molecules/Button';
import ImageTile from '../molecules/ImageTile';

type ModularQuadGridProps = {
  title?: string;
  gridItems?: Array<any>;
  ctaButtonText?: string;
  ctaButtonUrl?: string;
};

const ModularQuadGrid = ({ title, gridItems, ctaButtonText, ctaButtonUrl }: ModularQuadGridProps) => {
  return (
    <ModularQuadGridContainer>
      <div className="title__container">
        <h2 className="h1 primary">{title}</h2>
      </div>

      <div className="grid__container">
        {gridItems?.map((item) => {
          const { itemTitle, itemImage, itemUrl, itemCaption } = item || {};

          return (
            <div className="item__container" key={uuidv4()}>
              <div className="item__inner">
                <UniLink route={itemUrl}>
                  <ImageTile isProductImage={false} image={{ ...itemImage }} extraClass="no-bottom-padding" />
                </UniLink>
                <div className="item__content">
                  <h4>{itemTitle}</h4>
                  {itemCaption && <div className="item__caption" dangerouslySetInnerHTML={{ __html: itemCaption }}></div>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {ctaButtonText && ctaButtonUrl && (
        <div className="grid-footer__container">
          <UniLink route={ctaButtonUrl}>
            <Button className={'primary'}>{ctaButtonText}</Button>
          </UniLink>
        </div>
      )}
    </ModularQuadGridContainer>
  );
};

export default ModularQuadGrid;

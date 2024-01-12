/** This section is a 4 item image grid on desktop,
 * and a stacked 2x2 image grid on mobile */

import { DarksideButton, Heading, ImageTile, UniLink } from '@diamantaire/darkside/components/common-ui';
import { DatoDarksideButtonProps } from '@diamantaire/shared/types';
import { v4 as uuidv4 } from 'uuid';

import { ModularQuadGridContainer } from './ModularQuadGrid.style';

type ModularQuadGridProps = {
  title?: string;
  gridItems?: Array<any>;
  darksideButtons: DatoDarksideButtonProps[];
};

const ModularQuadGrid = ({ title, gridItems, darksideButtons }: ModularQuadGridProps) => {
  return (
    <ModularQuadGridContainer>
      <div className="title__container">
        <h2 className="h1 primary">{title}</h2>
      </div>

      <div className="grid__container">
        {gridItems?.map((item) => {
          const { itemTitle, itemImage, itemUrl, itemCaption, route } = item || {};

          return (
            <div className="item__container" key={uuidv4()}>
              <div className="item__inner">
                <UniLink route={route || itemUrl}>
                  <ImageTile isProductImage={false} image={itemImage} extraClass="no-bottom-padding" />
                </UniLink>
                <div className="item__content">
                  <Heading type="h4" className="primary">
                    {itemTitle}
                  </Heading>
                  {itemCaption && <div className="item__caption" dangerouslySetInnerHTML={{ __html: itemCaption }}></div>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {darksideButtons?.length > 0 && (
        <div className="grid-footer__container">
          {darksideButtons?.map((button) => {
            return (
              <DarksideButton
                key={button.id}
                type={button.ctaButtonType}
                colorTheme={button.ctaButtonColorTheme}
                href={button.ctaLinkUrl}
              >
                {button.ctaCopy}
              </DarksideButton>
            );
          })}
        </div>
      )}
    </ModularQuadGridContainer>
  );
};

export default ModularQuadGrid;

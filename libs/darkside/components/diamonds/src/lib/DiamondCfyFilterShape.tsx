import { DarksideButton, Heading } from '@diamantaire/darkside/components/common-ui';
import { UniLink } from '@diamantaire/darkside/core';
import { useDiamondCfyData } from '@diamantaire/darkside/data/hooks';
import { ALL_CFY_DIAMOND_TYPES, POPULAR_CFY_DIAMOND_TYPES } from '@diamantaire/shared/constants';
import { getDiamondType } from '@diamantaire/shared/helpers';
import { diamondIconsMap } from '@diamantaire/shared/icons';

import StyledDiamondCfyFilterShape from './DiamondCfyFilterShape.style';

const DiamondCfyFilterShape = (props) => {
  const { locale, availableDiamondTypes, handleSelectShape } = props;
  const { data: { ctoDiamondTable } = {} } = useDiamondCfyData(locale);
  const { diamondSelectorTitle, diamondSelectorSubtitle, diamondResultMatchViewAllCta } = ctoDiamondTable;

  const diamondList = availableDiamondTypes
    ? availableDiamondTypes.map((v) => getDiamondType(v))
    : ALL_CFY_DIAMOND_TYPES.map((v) => getDiamondType(v));

  const diamondListTrimmed = diamondList.filter((v) => v);

  const popularShapes = diamondListTrimmed.filter((v) => POPULAR_CFY_DIAMOND_TYPES.includes(v?.slug));
  const regularShapes = diamondListTrimmed.filter((v) => !POPULAR_CFY_DIAMOND_TYPES.includes(v?.slug));

  return (
    <StyledDiamondCfyFilterShape>
      <Heading type="h2" className="title">
        {diamondSelectorTitle}
      </Heading>

      <div className="lists">
        {(popularShapes.length === 6 && (
          <>
            <div className="list popular">
              <Heading type="h3" className="subtitle">
                {diamondSelectorSubtitle}
              </Heading>

              {popularShapes.map((v) => {
                const shape = diamondIconsMap[v.slug];

                return (
                  <div className="list-item" key={v.slug} title={v.title} onClick={() => handleSelectShape(v)}>
                    <div className="icon">
                      <shape.icon />
                    </div>
                    <div className="name">{v.title}</div>
                  </div>
                );
              })}
            </div>

            <div className="list">
              {regularShapes.map((v) => {
                const shape = diamondIconsMap[v?.slug];

                return (
                  shape && (
                    <div className="list-item" key={v.slug} title={v.title} onClick={() => handleSelectShape(v)}>
                      <div className="icon">
                        <shape.icon />
                      </div>
                      <div className="name">{v.title}</div>
                    </div>
                  )
                );
              })}
            </div>
          </>
        )) || (
          <div className="list">
            {diamondList.map((v) => {
              const shape = diamondIconsMap[v?.slug];

              return (
                shape && (
                  <div className="list-item" key={v.slug} title={v.title} onClick={() => handleSelectShape(v)}>
                    <shape.icon />
                  </div>
                )
              );
            })}
          </div>
        )}
      </div>

      <div className="cta">
        <UniLink route="/diamonds/inventory" className="link-view-all">
          <DarksideButton type="underline" colorTheme="teal">
            {diamondResultMatchViewAllCta}
          </DarksideButton>
        </UniLink>
      </div>
    </StyledDiamondCfyFilterShape>
  );
};

export { DiamondCfyFilterShape };

export default DiamondCfyFilterShape;

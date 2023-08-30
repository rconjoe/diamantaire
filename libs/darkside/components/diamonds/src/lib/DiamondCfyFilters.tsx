import { DarksideButton, Heading } from '@diamantaire/darkside/components/common-ui';
import { UniLink } from '@diamantaire/darkside/core';
import { useDiamondCfyData } from '@diamantaire/darkside/data/hooks';
import { ALL_CFY_DIAMOND_TYPES, POPULAR_CFY_DIAMOND_TYPES } from '@diamantaire/shared/constants';
import { getDiamondType } from '@diamantaire/shared/helpers';
import { diamondIconsMap } from '@diamantaire/shared/icons';

import StyledDiamondCfyFilters from './DiamondCfyFilters.style';

const DiamondCfyFilters = (props) => {
  const { locale, availableDiamondTypes } = props;
  const { data: { ctoDiamondTable } = {} } = useDiamondCfyData(locale);
  const { diamondSelectorTitle, diamondSelectorSubtitle, diamondResultMatchViewAllCta } = ctoDiamondTable;

  console.log(`ctoDiamondTable`, ctoDiamondTable);

  const diamondList = availableDiamondTypes
    ? availableDiamondTypes.map((v) => getDiamondType(v))
    : ALL_CFY_DIAMOND_TYPES.map((v) => getDiamondType(v));

  const popularShapes = diamondList.filter((v) => POPULAR_CFY_DIAMOND_TYPES.includes(v.slug));
  const regularShapes = diamondList.filter((v) => !POPULAR_CFY_DIAMOND_TYPES.includes(v.slug));

  console.log(`POPULAR_CFY_DIAMOND_TYPES`, POPULAR_CFY_DIAMOND_TYPES);
  console.log(`diamondList`, popularShapes.length, diamondList);
  console.log(`diamondIconsMap`, diamondIconsMap);

  return (
    <StyledDiamondCfyFilters>
      <Heading type="h2" className="title">
        {diamondSelectorTitle}
      </Heading>

      <div className="diamond-lists">
        {(popularShapes.length === 6 && (
          <>
            <div className="diamond-list popular">
              <Heading type="h3" className="subtitle">
                {diamondSelectorSubtitle}
              </Heading>

              {popularShapes.map((v) => {
                const shape = diamondIconsMap[v.slug];

                return (
                  <div className="diamond-list-item" key={v.slug} title={v.title}>
                    <div className="icon">
                      <shape.icon />
                    </div>
                    <div className="name">{v.title}</div>
                  </div>
                );
              })}
            </div>

            <div className="diamond-list">
              {regularShapes.map((v, i) => {
                const shape = diamondIconsMap[v.slug];

                return (
                  diamondIconsMap[v.slug] && (
                    <div className="diamond-list-item" key={v.slug} title={v.title}>
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
          <div className="diamond-list">
            {diamondList.map((v) => {
              const shape = diamondIconsMap[v.slug];

              return (
                <div className="diamond-list-item" key={v.slug} title={v.title}>
                  <shape.icon />
                </div>
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
    </StyledDiamondCfyFilters>
  );
};

export { DiamondCfyFilters };

export default DiamondCfyFilters;

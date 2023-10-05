import { DarksideButton, Heading, Markdown, UniLink } from '@diamantaire/darkside/components/common-ui';
import { ProductAppointmentCTA } from '@diamantaire/darkside/components/products/pdp';
import { useDiamondCfyData, useTranslations } from '@diamantaire/darkside/data/hooks';
import { ALL_CFY_DIAMOND_TYPES, POPULAR_CFY_DIAMOND_TYPES } from '@diamantaire/shared/constants';
import { getDiamondType } from '@diamantaire/shared/helpers';
import { diamondIconsMap } from '@diamantaire/shared/icons';
import { useEffect, useRef } from 'react';

import StyledDiamondCfyFilterShape from './DiamondCfyFilterShape.style';

const DiamondCfyFilterShape = (props) => {
  const { locale, availableDiamondTypes, handleSelectShape } = props;
  const { data: { ctoDiamondTable } = {} } = useDiamondCfyData(locale);
  const {
    diamondSelectorSubtitle,
    diamondResultMatchViewAllCta,
    selectFromOurMostPopularShapes,
    mostPopularShapes,
    interestedInARareShape,
    bookAnAppointmentWithADiamondExpert,
  } = ctoDiamondTable;

  const { _t } = useTranslations(locale, 'DIAMOND_SHAPES');

  const diamondList = availableDiamondTypes
    ? availableDiamondTypes.map((v) => getDiamondType(v))
    : ALL_CFY_DIAMOND_TYPES.map((v) => getDiamondType(v));

  const diamondListTrimmed = diamondList.filter((v) => v);

  const popularShapes = diamondListTrimmed.filter((v) => POPULAR_CFY_DIAMOND_TYPES.some((x) => x === v?.slug));
  const regularShapes = diamondListTrimmed.filter((v) => !POPULAR_CFY_DIAMOND_TYPES.some((x) => x === v?.slug));

  const linkEl = useRef(null);
  const appointmentEl = useRef(null);

  const getToAppointment = (e) => {
    e.preventDefault();

    const appointmentElement = appointmentEl.current?.querySelector('.appointment-button');

    appointmentElement.click();
  };

  useEffect(() => {
    const linkElement = linkEl.current?.querySelector('a');

    linkElement?.addEventListener('click', getToAppointment);

    return () => {
      linkElement?.removeEventListener('click', getToAppointment);
    };
  });

  return (
    <StyledDiamondCfyFilterShape>
      <Heading type="h2" className="title">
        {selectFromOurMostPopularShapes}
      </Heading>
      <div className="subtitle">
        <p>{diamondSelectorSubtitle}</p>
      </div>
      <div className="lists">
        <div className="list popular">
          {popularShapes.map((v) => {
            const shape = diamondIconsMap[v.slug];

            return (
              <div className="list-item" key={v.slug} title={_t(v.slug)} onClick={() => handleSelectShape(v)}>
                <div className="icon">
                  <shape.icon />
                </div>
                <div className="name">{_t(v.slug)}</div>
              </div>
            );
          })}
        </div>

        <div className="cta">
          <UniLink route="/diamonds/inventory" className="link-view-all">
            <DarksideButton type="underline" colorTheme="teal">
              {diamondResultMatchViewAllCta}
            </DarksideButton>
          </UniLink>
        </div>

        <div className="box">
          <Heading type="h2" className="title">
            {interestedInARareShape}
          </Heading>

          <div ref={linkEl} className="subtitle">
            <Markdown extraClass="subtitle">{bookAnAppointmentWithADiamondExpert}</Markdown>
          </div>
          <div className="list">
            {regularShapes.map((v) => {
              const shape = diamondIconsMap[v?.slug];

              return (
                shape && (
                  <div className="list-item" key={v.slug} title={_t(v.slug)} onClick={getToAppointment}>
                    <div className="icon">
                      <shape.icon />
                    </div>
                    <div className="name">{_t(v.slug)}</div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
      <div ref={appointmentEl} className="appointment">
        <ProductAppointmentCTA />
      </div>
    </StyledDiamondCfyFilterShape>
  );
};

export { DiamondCfyFilterShape };

export default DiamondCfyFilterShape;

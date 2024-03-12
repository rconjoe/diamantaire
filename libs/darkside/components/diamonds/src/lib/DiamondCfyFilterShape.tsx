import { DarksideButton, Heading, ProductAppointmentCTA, UniLink } from '@diamantaire/darkside/components/common-ui';
import { useDiamondCfyData, useTranslations, humanNamesMapperType } from '@diamantaire/darkside/data/hooks';
import { ALL_CFY_DIAMOND_TYPES, DIAMOND_CFY_CARAT_DEFAULT, POPULAR_CFY_DIAMOND_TYPES } from '@diamantaire/shared/constants';
import { getDiamondType } from '@diamantaire/shared/helpers';
import { diamondIconsMap } from '@diamantaire/shared/icons';
import { useEffect, useRef } from 'react';

import StyledDiamondCfyFilterShape from './DiamondCfyFilterShape.style';

const DiamondCfyFilterShape = (props) => {
  const { locale, availableDiamondTypes, selectedProduct, selectedCarat, productSlug, collectionSlug } = props;

  const { data: { ctoDiamondTable } = {} } = useDiamondCfyData(locale);

  const { diamondResultMatchViewAllCta, diamondSelectorTitle, diamondSelectorSubtitle } = ctoDiamondTable;

  const { _t } = useTranslations(locale, [humanNamesMapperType.DIAMOND_SHAPES]);

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

  const queryLink: {
    carat?: string;
    product?: string;
    productSlug?: string;
    collectionSlug?: string;
  } = {
    carat: selectedCarat || DIAMOND_CFY_CARAT_DEFAULT,
    ...(selectedProduct ? { product: selectedProduct } : {}),
    ...(productSlug ? { productSlug } : {}),
    ...(collectionSlug ? { collectionSlug } : {}),
  };

  const queryParams = new URLSearchParams(queryLink);

  return (
    <StyledDiamondCfyFilterShape>
      <Heading type="h2" className="title">
        {diamondSelectorTitle}
      </Heading>
      <div className="lists">
        <div className="list popular">
          <div className="subtitle">
            <p>{diamondSelectorSubtitle}</p>
          </div>

          {popularShapes.map((v) => {
            const shape = diamondIconsMap[v.slug];
            const href = `/diamonds/${v.slug}?${queryParams.toString()}`;

            return (
              <UniLink route={href} className="list-item" key={v.slug}>
                <div className="icon">
                  <shape.icon />
                </div>
                <div className="name">{_t(v.slug)}</div>
              </UniLink>
            );
          })}
        </div>

        <div className="list">
          {regularShapes.map((v) => {
            const shape = diamondIconsMap[v?.slug];
            const href = `/diamonds/${v.slug}?${queryParams.toString()}`;

            return (
              shape && (
                <UniLink route={href} className="list-item" key={v.slug}>
                  <div className="icon">
                    <shape.icon />
                  </div>
                  <div className="name">{_t(v.slug)}</div>
                </UniLink>
              )
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
      </div>

      <div ref={appointmentEl} className="appointment">
        <ProductAppointmentCTA withHiddenButton={true} />
      </div>
    </StyledDiamondCfyFilterShape>
  );
};

export { DiamondCfyFilterShape };

export default DiamondCfyFilterShape;

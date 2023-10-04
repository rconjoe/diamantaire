import { BlockPicker } from '@diamantaire/darkside/components/blockpicker-blocks';
import { DarksideButton, Form, Heading, SwiperStyles } from '@diamantaire/darkside/components/common-ui';
import { GlobalContext } from '@diamantaire/darkside/context/global-context';
import { UIString, UniLink } from '@diamantaire/darkside/core';
import { useDiamondPdpData, useDiamondTableData, useDiamondsData, useTranslations } from '@diamantaire/darkside/data/hooks';
import { getDiamondType, getIsUserInEu, makeCurrency } from '@diamantaire/shared/helpers';
import { Fragment, useContext } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Diamond360 from './Diamond360';
import StyledDiamondDetail from './DiamondDetail.style';
import DiamondDetailAccordion from './DiamondDetailAccordion';
import DiamondDetailIconList from './DiamondDetailIconList';
import DiamondDetailSpecs from './DiamondDetailSpecs';
import DiamondHand from './DiamondHand';

interface DiamondDetailDataTypes {
  lotId?: string;
  diamondType?: string;
  locale?: string;
  countryCode?: string;
  currencyCode?: string;
}

const DiamondDetail = ({ lotId, diamondType, locale, countryCode, currencyCode }: DiamondDetailDataTypes) => {
  const { isMobile, headerHeight } = useContext(GlobalContext);
  const { _t } = useTranslations(locale);
  const { data: { diamond: product } = {} } = useDiamondsData({ lotId });
  const { data: { diamondTable: DiamondTableData } = {} } = useDiamondTableData(locale);
  const { data: { diamondProduct: DiamondPdpData } = {} } = useDiamondPdpData(locale);
  const { specs } = DiamondTableData || {};
  const { productTitle, buttonTextDiamondFlow, quickCheckoutText } = DiamondPdpData || {};

  const { carat: productCarat, price: productPrice } = product || {};
  const getInfo = (arr, v) => arr.find((x) => x.key === v);
  const price = productPrice ? makeCurrency(productPrice, locale, currencyCode) : null;
  const diamondTitle = _t(getDiamondType(diamondType)?.slug);

  const media = [
    <Diamond360 key="0" className="media-content-item" diamondType={diamondType} lotId={lotId} />,
    <DiamondHand key="1" className="media-content-item" diamondType={diamondType} lotId={lotId} />,
  ];

  return (
    <StyledDiamondDetail headerHeight={headerHeight}>
      <div className="body">
        <div className="main">
          <div className="media">
            <div className="media-content">
              {(isMobile && (
                <SwiperStyles className="carousel">
                  <Swiper pagination={{ clickable: true }} modules={[Pagination]}>
                    {media.map((v, i) => {
                      return <SwiperSlide key={`media${i}`}>{v}</SwiperSlide>;
                    })}
                  </Swiper>
                </SwiperStyles>
              )) ||
                media.map((v) => v)}
            </div>
          </div>
        </div>

        <div className="aside">
          <Heading className="title" type="h2">
            {productCarat} {getInfo(specs, 'carat')?.value} {diamondTitle} {productTitle}
          </Heading>

          {price && (
            <div className="price">
              <span>{price}</span>

              {getIsUserInEu() && (
                <div className="price-text">
                  <UIString>incl. VAT</UIString>
                </div>
              )}
            </div>
          )}

          <DiamondDetailAccordion lotId={lotId} locale={locale} />

          <div className="cta">
            {(product?.available_inventory && (
              <>
                <DarksideButton type="solid" colorTheme="black">
                  {buttonTextDiamondFlow}
                </DarksideButton>

                <DarksideButton type="underline" colorTheme="teal">
                  {quickCheckoutText}
                </DarksideButton>
              </>
            )) || (
              <UniLink route={`/diamonds/inventory/${diamondType}`}>
                <DarksideButton type="outline" colorTheme="black">
                  <UIString>Sold: Browse other diamonds</UIString>
                </DarksideButton>
              </UniLink>
            )}
          </div>

          <DiamondDetailIconList locale={locale} />

          <div className="mail">
            <strong className="title">
              <UIString>Need more time to think?</UIString>
            </strong>

            <p>Email this diamond to yourself or drop a hint.</p>

            <Form onSubmit={(e) => e.preventDefault()} />
          </div>

          <DiamondDetailSpecs lotId={lotId} locale={locale} />
        </div>
      </div>

      <div className="foot">
        {DiamondPdpData.content.map((v, i) => {
          return (
            <Fragment key={`${v._modelApiKey}_${i}`}>
              <BlockPicker
                _modelApiKey={v._modelApiKey}
                modularBlockData={{ ...v }}
                countryCode={countryCode}
                currencyCode={currencyCode}
                shouldLazyLoad={true}
              />
            </Fragment>
          );
        })}
      </div>
    </StyledDiamondDetail>
  );
};

export { DiamondDetail };

export default DiamondDetail;

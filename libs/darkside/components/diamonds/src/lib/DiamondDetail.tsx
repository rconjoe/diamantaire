import { BlockPicker } from '@diamantaire/darkside/components/blockpicker-blocks';
import { Form, Button, Heading, SwiperStyles } from '@diamantaire/darkside/components/common-ui';
import { GlobalContext } from '@diamantaire/darkside/context/global-context';
import { UIString } from '@diamantaire/darkside/core';
import { useDiamondsData, useDiamondTableData, useDiamondPdpData } from '@diamantaire/darkside/data/hooks';
import { makeCurrency } from '@diamantaire/shared/helpers';
import { useContext, Fragment } from 'react';
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
  const { data: { diamond: product } = {} } = useDiamondsData({ lotId });
  const { data: { diamondTable: DiamondTableData } = {} } = useDiamondTableData(locale);
  const { data: { diamondProduct: DiamondPdpData } = {} } = useDiamondPdpData(locale);
  const { specs } = DiamondTableData || {};
  const { productTitle, buttonTextDiamondFlow, quickCheckoutText } = DiamondPdpData || {};

  const { carat: productCarat, price: productPrice } = product || {};
  const getInfo = (arr, v) => arr.find((x) => x.key === v);
  const price = makeCurrency(productPrice, locale, currencyCode);

  const media = [
    <Diamond360 key="0" className="media-content-item" lotId={lotId} diamondType={diamondType} />,
    <DiamondHand key="1" className="media-content-item" lotId={lotId} diamondType={diamondType} />,
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
            {productCarat} {getInfo(specs, 'carat')?.value} {diamondType} {productTitle}
          </Heading>

          <div className="price">{price}</div>

          <DiamondDetailAccordion lotId={lotId} />

          <div className="cta">
            <Button className="tertiary">{buttonTextDiamondFlow}</Button>

            <Button className="-link-teal">{quickCheckoutText}</Button>
          </div>

          <DiamondDetailIconList />

          <div className="mail">
            <Heading className="title" type="h2">
              <UIString>Need more time to think?</UIString>
            </Heading>

            <p>Email this diamond to yourself or drop a hint.</p>

            <Form onSubmit={(e) => e.preventDefault()} />
          </div>

          <DiamondDetailSpecs lotId={lotId} />
        </div>
      </div>

      <div className="foot">
        {DiamondPdpData.content.map((v, i) => {
          return (
            <Fragment key={`${v._modelApiKey}_${i}`}>
              <BlockPicker
                _modelApiKey={v._modelApiKey}
                modularBlockData={{ ...v }}
                isMobile={false}
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

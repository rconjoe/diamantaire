import { ShopifyImage } from '@diamantaire/darkside/components/common-ui';
import { ENGAGEMENT_RING_PRODUCT_TYPE } from '@diamantaire/shared/constants';
import { MimeTypes } from '@diamantaire/shared/types';
import { media } from '@diamantaire/styles/darkside-styles';
import { useState } from 'react';
import styled from 'styled-components';
import { Keyboard, Lazy, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import { SpriteSpinnerBlock } from '../media-gallery/SpriteSpinnerBlock';
import { ProductDiamondHand } from '../ProductDiamondHand';

const MediaSliderContainer = styled.div`
  position: relative;
  display: block;
  margin: 0 auto;
  padding: 0;
  height: 100%;
  max-width: 100%;
  overflow: hidden;
  width: 100vw;
  ${media.medium`display: none;`}

  .swiper-wrapper {
    display: flex;

    .swiper-slide {
      flex: 0 0 100%;
    }
  }
  .swiper-pagination {
    display: flex;
    justify-content: center;
    padding: calc(var(--gutter) / 3) 0;

    .swiper-pagination-bullet {
      height: 0.5rem;
      width: 0.5rem;
      display: block;
      background-color: #000;
      margin-right: 1rem;
      border-radius: 50%;
      opacity: 0.2;

      &:last-child {
        margin-right: 0px;
      }

      &.swiper-pagination-bullet-active {
        opacity: 1;
      }
    }
  }
`;

const DEFAULT_BREAKPOINTS = {
  200: { slidesPerView: 1, slidesPerGroup: 1 },
};

const MediaSlider = ({ assets, options, diamondType, productType }) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  console.log('swiper', swiper, productType);

  return (
    <MediaSliderContainer>
      <Swiper
        className="media-slider__swiper"
        spaceBetween={20}
        loop={false}
        modules={[Navigation, Keyboard, Lazy, Pagination]}
        breakpoints={DEFAULT_BREAKPOINTS}
        keyboard={true}
        onSwiper={setSwiper}
        watchSlidesProgress={true}
        pagination={{ clickable: true }}
        navigation={true}
      >
        {assets?.map((asset, index) => {
          const { mimeType } = asset || {};

          switch (mimeType) {
            case MimeTypes.ImageJpeg: {
              if (asset.customData?.bunny === 'true' || asset.customData?.sprite === 'true') {
                if (asset.customData?.mobile !== 'true') return null;

                return (
                  <SwiperSlide key={`mobile-pdp-slide-${index}`}>
                    <SpriteSpinnerBlock
                      sprite={asset}
                      options={options}
                      srcType={asset.customData?.sprite === 'true' ? 'legacy' : 'bunny'}
                      mobile={asset.customData?.mobile === 'true'}
                    />
                  </SwiperSlide>
                );
              }

              return (
                <SwiperSlide key={`mobile-pdp-slide-${index}`}>
                  <ShopifyImage image={asset} />
                </SwiperSlide>
              );
            }
            default: {
              return null;
            }
          }
        })}
        {productType === ENGAGEMENT_RING_PRODUCT_TYPE ? (
          <SwiperSlide>
            <ProductDiamondHand range={[0.5, 8]} initValue={2} diamondType={diamondType} />
          </SwiperSlide>
        ) : null}
      </Swiper>
    </MediaSliderContainer>
  );
};

export { MediaSlider };

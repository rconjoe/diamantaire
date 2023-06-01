import { ShopifyImage } from '@diamantaire/darkside/components/common-ui';
import { MimeTypes } from '@diamantaire/shared/types';
import { useState } from 'react';
import styled from 'styled-components';
import { Navigation, Keyboard, Lazy, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

const MediaSliderContainer = styled.div`
  position: relative;
  display: block;
  margin: 0 auto;
  padding: 0;
  height: 100%;
  max-width: 100%;
  overflow: hidden;
  width: 100vw;

  .swiper-wrapper {
    display: flex;

    .swiper-slide {
      flex: 0 0 100%;
    }
  }
  .swiper-pagination {
    display: flex;
    justify-content: center;
    padding: calc(var(--gutter) / 2) 0 calc(var(--gutter) / 4);

    .swiper-pagination-bullet {
      height: 5px;
      width: 5px;
      display: block;
      background-color: #000;
      margin-right: 10px;
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

const MediaSlider = ({ assets }) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  console.log('swiper', swiper);

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
      </Swiper>
    </MediaSliderContainer>
  );
};

export { MediaSlider };

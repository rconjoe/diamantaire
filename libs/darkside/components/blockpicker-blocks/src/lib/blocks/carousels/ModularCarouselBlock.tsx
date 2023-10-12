/**
 * This is the slider instance that wraps all sliders.
 * The standard slider is meant for most mobile experiences (centered 3 item slider on mobile, four item slider on desktop),
 * but this config can be overwritten via props on the slider
 *
 * In the case of a new slider, we use this as a starting point, and use the config and/or a new slide to achieve the intended UI
 *
 * Darkside note: This carousel handles what was previously: InstagramReelSwiper, CelebritySwiper, ModularHoverBlock, ModularSlickCarouselBlock
 */

import { Heading } from '@diamantaire/darkside/components/common-ui';
import { useBlockProducts } from '@diamantaire/darkside/data/hooks';
import { SwiperSlide } from 'swiper/react';
import { v4 as uuidv4 } from 'uuid';

import CarouselSlider from './CarouselSlider';
import { ModularCarouselBlockContainer } from './ModularCarouselBlock.style';
import ModularCarouselBlockOptions from './ModularCarouselBlockOptions';
import CelebrityThumbnailSlide from './slides/CelebrityThumbnailSlide';
import DiamondSlide from './slides/DiamondSlide';
import InstagramThumnailSlide from './slides/InstagramThumbnailSlide';
import SimpleProductSlide from './slides/SimpleProductSlide';
import StandardSlide from './slides/StandardSlide';
import VideoHoverSlide from './slides/VideoHoverSlide';

const ModularCarouselBlock = (props) => {
  const { _modelApiKey, blocks, darksideButtons } = props;

  const sliderTypes = [
    {
      type: 'modular_celebrity_carousel_block',
      title: props.thumbnailCarouselTitle,
      slide: CelebrityThumbnailSlide,
    },
    {
      type: 'modular_instagram_reel_block',
      title: props.title,
      subtitle: props.subtitle,
      slide: InstagramThumnailSlide,
    },
    {
      type: 'modular_carousel_hover_block',
      title: props.title,
      slide: VideoHoverSlide,
    },
    {
      type: 'modular_slick_carousel_block',
      title: props.title,
      slide: DiamondSlide,
      breakpoints: {
        200: {
          slidesPerView: 2,
          centeredSlides: true,
          spaceBetween: 25,
        },
        768: {
          slidesPerView: 5,
          centeredSlides: false,
          spaceBetween: 50,
        },
        992: {
          slidesPerView: 5,
          centeredSlides: false,
          spaceBetween: 100,
        },
      },
    },
    {
      type: 'modular_grid_carousel_block',
      title: null,
      slide: StandardSlide,
    },
    {
      type: 'modular_product_slider_block',
      title: null,
      slide: SimpleProductSlide,
    },
    {
      type: 'modular_carousel_block',
      title: null,
      slide: ModularCarouselBlockOptions,
      className: 'quote-slider',
      breakpoints: {
        200: {
          slidesPerView: 1,
          centeredSlides: true,
          spaceBetween: 25,
        },
        768: {
          slidesPerView: 1,
          centeredSlides: false,
          spaceBetween: 50,
        },
        992: {
          slidesPerView: 1,
          centeredSlides: false,
          spaceBetween: 100,
        },
      },
    },
  ];

  const sliderType = sliderTypes.filter((slider) => slider.type === _modelApiKey)?.[0];
  const SelectedSliderSlide = sliderType?.slide;

  // Use pulls in product data
  const slugsIfProducts =
    (_modelApiKey === 'modular_product_slider_block' &&
      blocks?.map((block) => block?.configuration?.shopifyProductHandle)) ||
    [];

  const { data } = useBlockProducts(props.id, slugsIfProducts);

  return (
    <ModularCarouselBlockContainer className={_modelApiKey}>
      {_modelApiKey === 'modular_product_slider_block' && props.title && (
        <Heading type="h2" className="h1 primary carousel__title">
          {props.title}
        </Heading>
      )}
      {SelectedSliderSlide ? (
        <CarouselSlider
          {...sliderType}
          hasPagination={_modelApiKey === 'modular_carousel_block'}
          darksideButtons={darksideButtons}
        >
          {blocks?.map((slide) => {
            const productData =
              slugsIfProducts && data?.find((product) => product?.collectionSlug === slide?.configuration?.collection?.slug);

            return (
              <SwiperSlide className={_modelApiKey} key={`slide-${slide.id ? slide.id : uuidv4()}`}>
                <SelectedSliderSlide {...slide} productData={productData} />
              </SwiperSlide>
            );
          })}
        </CarouselSlider>
      ) : (
        <p>No slide found for {_modelApiKey}</p>
      )}
    </ModularCarouselBlockContainer>
  );
};

export default ModularCarouselBlock;

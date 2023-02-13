// This carousel is able to handle InstagramReelSwiper, CelebritySwiper, ModularHoverBlock,
import React from 'react';
import { SwiperSlide } from 'swiper/react';
import { v4 as uuidv4 } from 'uuid';

import CarouselSlider from './atoms/CarouselSlider';
import { ModularCarouselBlockContainer } from './ModularCarouselBlock.style';
import CelebrityThumbnailSlide from './slides/CelebrityThumbnailSlide';
import DiamondSlide from './slides/DiamondSlide';
import InstagramThumnailSlide from './slides/InstagramThumbnailSlide';
import VideoHoverSlide from './slides/VideoHoverSlide';

const ModularCarouselBlock = (props) => {
  const { _modelApiKey, blocks } = props;

  console.log('props', props);

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
  ];

  const sliderType = sliderTypes.filter((sliderType) => sliderType.type === _modelApiKey)?.[0];
  const SelectedSliderSlide = sliderType?.slide;

  return (
    <ModularCarouselBlockContainer>
      {SelectedSliderSlide ? (
        <CarouselSlider {...sliderType}>
          {blocks?.map((slide) => {
            return (
              <SwiperSlide key={`slide-${uuidv4()}`}>
                <SelectedSliderSlide {...slide} />
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

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
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useState } from 'react';

import CarouselSlider from './CarouselSlider';
import CelebrityModal from './CelebrityModal';
import { ModularCarouselBlockContainer } from './ModularCarouselBlock.style';
import ModularCarouselBlockOptions from './ModularCarouselBlockOptions';
import CelebrityThumbnailSlide from './slides/CelebrityThumbnailSlide';
import DiamondSlide from './slides/DiamondSlide';
import InstagramThumnailSlide from './slides/InstagramThumbnailSlide';
import SimpleProductSlide from './slides/SimpleProductSlide';
import StandardSlide from './slides/StandardSlide';
import VideoHoverSlide from './slides/VideoHoverSlide';

const ModularCarouselBlock = (props) => {
  const { locale } = useRouter();

  const { _modelApiKey, blocks, darksideButtons, showDots, id } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  function toggleModal(celebrity) {
    if (isModalOpen) {
      setModalContent(null);
      setIsModalOpen(false);
    } else {
      setModalContent(celebrity);
      setIsModalOpen(true);
    }
  }

  const sliderTypes = [
    {
      type: 'modular_celebrity_carousel_block',
      title: props.thumbnailCarouselTitle,
      slide: CelebrityThumbnailSlide,
      additionalProps: {
        toggleModal,
      },
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
    },
  ];

  const sliderType = sliderTypes.filter((slider) => slider.type === _modelApiKey)?.[0];
  const SelectedSliderSlide = sliderType?.slide;

  // Use pulls in product data
  const slugsIfProducts =
    (_modelApiKey === 'modular_product_slider_block' &&
      blocks?.map((block) => block?.configuration?.shopifyProductHandle)) ||
    [];

  const { data } = useBlockProducts(slugsIfProducts, locale);

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
          className={_modelApiKey}
          hasPagination={_modelApiKey === 'modular_carousel_block'}
          darksideButtons={darksideButtons}
          blocksCount={blocks?.length}
          showDots={showDots}
          id={id}
        >
          {blocks?.map((slide) => {
            const productData =
              slugsIfProducts &&
              data &&
              data?.products?.find(
                (productNode) => productNode?.product?.collectionSlug === slide?.configuration?.collection?.slug,
              );

            return (
              <div className={clsx('embla__slide', _modelApiKey)} key={slide?.id}>
                <SelectedSliderSlide {...slide} {...sliderType?.additionalProps} productData={productData} />
              </div>
            );
          })}
        </CarouselSlider>
      ) : (
        <p>No slide found for {_modelApiKey}</p>
      )}
      {_modelApiKey === 'modular_celebrity_carousel_block' && isModalOpen && (
        <CelebrityModal toggleModal={toggleModal} modalContent={modalContent} />
      )}
    </ModularCarouselBlockContainer>
  );
};

export default ModularCarouselBlock;

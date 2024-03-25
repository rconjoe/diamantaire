import { ShopifyImage, UIString } from '@diamantaire/darkside/components/common-ui';
import { MimeTypes } from '@diamantaire/shared/types';
import { media } from '@diamantaire/styles/darkside-styles';
import useEmblaCarousel from 'embla-carousel-react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { SpriteSpinnerBlock } from '../media-gallery/SpriteSpinnerBlock';
import { VideoAsset } from '../media-gallery/VideoAsset';
import { ProductDiamondHand } from '../ProductDiamondHand';

const MediaSliderContainer = styled.div`
  position: relative;
  display: block;
  margin: ${({ hasPagination }) => (hasPagination ? '0 auto' : '0 auto 20px')};
  padding: 0;
  height: 100%;
  max-width: 100%;
  overflow: hidden;
  width: 100vw;
  ${media.medium`display: none;`}

  .embla__slide {
    position: relative;
    display: flex;

    > div {
      flex: 1;
      display: flex;
      aspect-ratio: 1; /* Maintain a square aspect ratio */
      justify-content: center;
      align-items: center;

      img {
        flex: 1;
      }

      .image {
        object-fit: contain;
        height: auto; /* or a specific height if required */
      }
    }

    .overlay-text {
      display: block;
      text-align: center;
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 1rem;
    }

    .hand {
      display: block;
      > div {
        max-width: 84%;
        margin: auto;
      }
    }

    p {
      position: absolute;
      bottom: 1.5rem;
      left: 0;
      width: 100%;
      text-align: center;
      font-size: var(--font-size-xxsmall);
    }
  }

  .slider-dots {
    flex: 1 1 100%;
    padding: 10px 0;
    @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
      display: none;
    }

    ul {
      display: flex;
      margin: 0;
      padding: 0;
      list-style: none;
      justify-content: center;
      gap: 1rem;

      li {
        button {
          height: 0.5rem;
          width: 0.5rem;
          background-color: var(--color-black);
          border: none;
          border-radius: 50%;
          line-height: 1;
          padding: 0;
          opacity: 0.1;

          &.active {
            opacity: 0.75;
          }
        }
      }
    }
  }
`;

const MediaSlider = ({
  assets,
  options,
  diamondType,
  title,
  shouldDisplayDiamondHand = false,
  disableHandSliderControls = false,
  presetHandSliderValue = null,
  productType,
  shownWithCtw,
}) => {
  const [totalSlides, setTotalSlides] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const hasPagination = totalSlides > 1;

  useEffect(() => {
    // Calculate the total number of slides, excluding assets with bunny set to true
    const slidesCount = assets?.reduce(
      (count, asset) => {
        return asset.customData?.bunny === 'true' ? count : count + 1;
      },
      shouldDisplayDiamondHand ? 1 : 0,
    );

    setTotalSlides(slidesCount);
  }, [assets, shouldDisplayDiamondHand]);

  const sliderOptions: any = {
    loop: false,
    dragFree: false,
    align: 'center',
    watchDrag: (_emblaApi, event) => {
      const target = event.target as Element;
      // Return false to cancel dragging on specific elements

      return !target.closest('.no-swiping');
    },
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(sliderOptions);

  useEffect(() => {
    if (!emblaApi) return;

    const updateActiveSlide = () => {
      setActiveSlide(emblaApi.selectedScrollSnap());
    };

    // Initialize the active slide
    updateActiveSlide();

    // Add event listeners to track the active slide
    emblaApi.on('select', updateActiveSlide);

    // Clean up the event listeners when the component unmounts
    return () => {
      emblaApi.off('select', updateActiveSlide);
    };
  }, [emblaApi]);

  const shouldLazyLoadTreshold = 1;

  return (
    <MediaSliderContainer hasPagination={hasPagination}>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {assets?.map((asset, index) => {
            const { mimeType, customData } = asset || {};
            const { title: imageTitle } = asset;
            const doesImageHaveTitle = imageTitle && imageTitle.length > 0;
            const shouldLazyLoad = index > shouldLazyLoadTreshold;

            if (customData?.bunny === 'true') return null;

            switch (mimeType) {
              case MimeTypes.ImageJpeg: {
                if (customData?.sprite) {
                  return (
                    <div className="embla__slide" key={`mobile-pdp-slide-${index}`}>
                      <SpriteSpinnerBlock
                        sprite={asset}
                        options={options}
                        srcType="legacy"
                        mobile={asset.customData?.mobile === 'true'}
                      />
                    </div>
                  );
                }

                return (
                  <div className="embla__slide" key={`mobile-pdp-slide-${index}`}>
                    <ShopifyImage image={asset} defaultAlt={title} shouldLazyLoad={shouldLazyLoad} />

                    {doesImageHaveTitle && (
                      <p
                        className="overlay-text"
                        style={{
                          color: customData?.color || 'var(--color-black)',
                        }}
                      >
                        {imageTitle}
                      </p>
                    )}

                    {index === 0 && productType === 'Engagement Ring' && (
                      <p>
                        <UIString>Shown with</UIString> {shownWithCtw ? shownWithCtw : '1.5ct'}
                      </p>
                    )}
                  </div>
                );
              }
              case MimeTypes.VideoMP4:
              case MimeTypes.VideoMov:
              case MimeTypes.QuicktimeVideo: {
                return (
                  <div className="embla__slide" key={`mobile-pdp-slide-${index}`}>
                    <VideoAsset video={asset} />
                  </div>
                );
              }
              default: {
                return null;
              }
            }
          })}

          {shouldDisplayDiamondHand ? (
            <div className="embla__slide">
              <div className="hand">
                <ProductDiamondHand
                  disableControls={disableHandSliderControls}
                  diamondType={diamondType}
                  range={[0.5, 8]}
                  initValue={presetHandSliderValue || 2}
                  prefix={presetHandSliderValue + 'ct'}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="slider-dots">
        <ul>
          {[...Array(totalSlides).keys()].map((index) => (
            <li key={`slider-dot-${index}`}>
              <button className={activeSlide === index ? 'active' : ''} onClick={() => emblaApi?.scrollTo(index)} />
            </li>
          ))}
        </ul>
      </div>
    </MediaSliderContainer>
  );
};

export { MediaSlider };

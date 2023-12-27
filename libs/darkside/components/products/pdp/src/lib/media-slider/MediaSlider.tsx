import { ShopifyImage } from '@diamantaire/darkside/components/common-ui';
import { MimeTypes } from '@diamantaire/shared/types';
import { media } from '@diamantaire/styles/darkside-styles';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
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
    display: flex;

    > * {
      flex: 1;
      display: flex;

      img {
        flex: 1;
      }
    }
    .hand {
      display: block;
    }
  }

  .slider-dots {
    flex: 1 1 100%;
    padding: 20px 0;
    @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
      display: none;
    }
    ul {
      display: flex;
      margin: 0;
      padding: 0;
      list-style: none;
      justify-content: center;

      li {
        margin-right: 5px;

        &:last-child {
          margin-right: 0px;
        }

        button {
          height: 0.8rem;
          width: 0.8rem;
          background-color: var(--color-black);
          border: none;
          border-radius: 50%;
          line-height: 1;
          padding: 0;
          opacity: 0.3;

          &.active {
            opacity: 0.75;
          }
        }
      }
    }
  }
`;

const MediaSlider = ({ assets, options, diamondType, shouldDisplayDiamondHand = false }) => {
  const [totalSlides, setTotalSlides] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const hasPagination = totalSlides > 1;

  useEffect(() => {
    // Calculate the total number of slides
    const slidesCount = assets?.length + (shouldDisplayDiamondHand ? 1 : 0);

    setTotalSlides(slidesCount);
  }, [assets, shouldDisplayDiamondHand]);

  const sliderOptions: EmblaOptionsType = {
    loop: false,
    dragFree: false,
    align: 'center',
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

  return (
    <MediaSliderContainer hasPagination={hasPagination}>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {assets?.map((asset, index) => {
            const { mimeType } = asset || {};

            switch (mimeType) {
              case MimeTypes.ImageJpeg: {
                if (asset.customData?.bunny === 'true' || asset.customData?.sprite === 'true') {
                  if (asset.customData?.mobile !== 'true') return null;

                  return (
                    <div className="embla__slide" key={`mobile-pdp-slide-${index}`}>
                      <SpriteSpinnerBlock
                        sprite={asset}
                        options={options}
                        srcType={asset.customData?.sprite === 'true' ? 'legacy' : 'bunny'}
                        mobile={asset.customData?.mobile === 'true'}
                      />
                    </div>
                  );
                }

                return (
                  <div className="embla__slide" key={`mobile-pdp-slide-${index}`}>
                    <ShopifyImage image={asset} />
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
                <ProductDiamondHand range={[0.5, 8]} initValue={2} diamondType={diamondType} />
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="slider-dots">
        <ul>
          {assets?.map((asset, index) => {
            if (asset.customData?.bunny === 'true' || asset.customData?.sprite === 'true') {
              if (asset.customData?.mobile !== 'true') return null;
            }

            return (
              <li key={`review-build-dot-${index}`}>
                <button className={activeSlide === index ? 'active' : ''} onClick={() => emblaApi?.scrollTo(index)}></button>
              </li>
            );
          })}
        </ul>
      </div>
    </MediaSliderContainer>
  );
};

export { MediaSlider };

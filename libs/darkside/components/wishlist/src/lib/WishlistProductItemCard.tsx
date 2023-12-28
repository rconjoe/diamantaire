import { DarksideButton, DatoImage, UIString, UniLink } from '@diamantaire/darkside/components/common-ui';
import { humanNamesMapperType, useTranslations } from '@diamantaire/darkside/data/hooks';
import { getFormattedCarat, getFormattedPrice } from '@diamantaire/shared/constants';
import { generateCfyDiamondSpriteThumbUrl, generateDiamondImageUrl, getDiamondType } from '@diamantaire/shared/helpers';
import { DropHintIcon } from '@diamantaire/shared/icons';
import { generateProductUrl } from '@diamantaire/shared-product';
import clsx from 'clsx';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import Image from 'next/image';
import { useEffect, useState, useMemo } from 'react';

import { WishlistLikeButton } from './WishlistLikeButton';

type HandleOpenDropHintModalProps = (data: { link: string; image: string }) => void;

interface CardBundleProps {
  handleOpenDropHintModal: HandleOpenDropHintModalProps;
  isSharedWishlistPage?: boolean;
  isWishlistPage?: boolean;
  id: string;
  locale: string;
  button: string;
  diamond: any;
  setting: {
    content: any;
    product: any;
  };
}

interface CardDiamondProps {
  handleOpenDropHintModal: HandleOpenDropHintModalProps;
  isSharedWishlistPage?: boolean;
  isWishlistPage?: boolean;
  button: string;
  locale: string;
  diamond: any;
  id: string;
}

interface CardProductProps {
  handleOpenDropHintModal: HandleOpenDropHintModalProps;
  isSharedWishlistPage?: boolean;
  isWishlistPage?: boolean;
  button: string;
  locale: string;
  id: string;
  content: any;
  product: any;
}

const CardDiamond: React.FC<CardDiamondProps> = ({
  id,
  diamond,
  button,
  locale,
  isWishlistPage,
  isSharedWishlistPage,
  handleOpenDropHintModal,
}) => {
  const { _t } = useTranslations(locale);
  const { _t: _tt } = useTranslations(locale, [humanNamesMapperType.UI_STRINGS]);

  const { slug, handle, diamondType, carat, price, color, clarity, cut } = diamond || {};

  const _f = useMemo(() => {
    return {
      carat: `${getFormattedCarat(carat, locale)}${_tt('ct')}`,
      price: getFormattedPrice(price, locale, true),
      type: _t(getDiamondType(diamondType)?.slug),
      cut: _t(cut),
      clarity: _t(clarity),
      color: _t(color),
      image: generateDiamondImageUrl(diamondType),
    };
  }, [diamond, locale]);

  const title = `${_f.type}, ${_f.carat}, ${_f.cut}, ${_f.color}, ${_f.clarity}`;

  const cto = slug && slug === 'cto-diamonds';

  const baseLink = '/diamonds' + (cto ? '/results/' : '/d/');

  const link = baseLink + (cto ? diamondType + '?carat=' + carat : handle);

  const image = generateCfyDiamondSpriteThumbUrl(diamondType);

  return (
    <div className="card item-diamond">
      <div className="poster">
        <Image alt={diamondType} src={image} sizes="100vw" height={0} width={0} />
      </div>

      <div className="text">
        <div className="title">{title}</div>

        <div className="action">
          <div className="price">{_f.price}</div>

          <DarksideButton href={link} type="solid">
            {button}
          </DarksideButton>

          {!isSharedWishlistPage && (
            <div className="share" onClick={() => handleOpenDropHintModal({ link, image })}>
              <DropHintIcon />
              <UIString>Drop a Hint</UIString>
            </div>
          )}
        </div>
      </div>

      {!isSharedWishlistPage && (
        <WishlistLikeButton extraClass={isWishlistPage ? 'wishlist-page' : 'wishlist-slideout'} productId={id} />
      )}
    </div>
  );
};

const CardProduct: React.FC<CardProductProps> = ({
  id,
  product,
  content,
  button,
  locale,
  isWishlistPage,
  isSharedWishlistPage,
  handleOpenDropHintModal,
}) => {
  const { _t } = useTranslations(locale, [humanNamesMapperType.UI_STRINGS]);

  if (!content || !product) {
    return;
  }

  const {
    requiresCustomDiamond,
    configuration: { caratWeight = null } = {},
    price: productPrice,
    productType,
    productSlug,
    collectionSlug,
  } = product;

  const { productTitle } = content;

  const price = getFormattedPrice(productPrice, locale, true);

  const imageData = {
    url: content?.plpImage?.responsiveImage?.url,
    ...(content?.plpImage?.responsiveImage ? { responsiveImage: content.plpImage.responsiveImage } : {}),
  };

  const { responsiveImage } = imageData || {};

  const { src: imageUrl } = responsiveImage || {};

  const link = generateProductUrl(productType, collectionSlug, productSlug);

  const caratNum = extractNumber(caratWeight);

  const translatedCarat = caratNum ? getFormattedCarat(caratNum, locale) : null;

  const title = caratWeight && caratWeight !== 'other' ? `${productTitle} - ${translatedCarat}${_t('ct')}` : productTitle;

  return (
    <div className="card item-product">
      <div className="poster">
        <DatoImage quality={100} image={imageData} />
      </div>
      <div className="text">
        <div className="title">{title}</div>

        <div className="action">
          <div className="price">
            {price}
            {requiresCustomDiamond && '+'}
          </div>

          <DarksideButton href={link} type="solid">
            {button}
          </DarksideButton>

          {!isSharedWishlistPage && (
            <div className="share" onClick={() => handleOpenDropHintModal({ link, image: imageUrl })}>
              <DropHintIcon />
              <UIString>Drop a Hint</UIString>
            </div>
          )}
        </div>
      </div>

      {!isSharedWishlistPage && (
        <WishlistLikeButton extraClass={isWishlistPage ? 'wishlist-page' : 'wishlist-slideout'} productId={id} />
      )}
    </div>
  );
};

const CardBundle: React.FC<CardBundleProps> = ({
  id,
  locale,
  button,
  diamond,
  setting,
  isWishlistPage,
  isSharedWishlistPage,
  handleOpenDropHintModal,
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const [loadPagination, setLoadPagination] = useState(0);

  const sliderOptions: EmblaOptionsType = {
    loop: false,
    dragFree: false,
    align: 'start',
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(sliderOptions);

  useEffect(() => {
    if (!emblaApi) return;

    const updateActiveSlide = () => {
      setActiveSlideIndex(emblaApi.selectedScrollSnap());
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

  useEffect(() => {
    setTimeout(() => setLoadPagination(loadPagination + 1), 100);
  }, []);

  const { _t } = useTranslations(locale);
  const { _t: _tt } = useTranslations(locale, [humanNamesMapperType.UI_STRINGS]);

  if (!diamond || !setting?.content || !setting?.product) return;

  const { content, product } = setting;

  const { diamondType, carat, price: diamondPrice, lotId } = diamond;

  const { price: productPrice, collectionSlug, productSlug } = product;

  const { productTitle } = content;

  const bundleTitle = `${productTitle} ${_t('with')} ${getFormattedCarat(carat, locale)}${_tt('ct')} ${_t(
    getDiamondType(diamondType)?.title,
  )}`;

  const bundlePrice = getFormattedPrice(productPrice + diamondPrice, locale, true);

  const imageData = {
    url: content?.plpImage?.responsiveImage?.url,
    ...(content?.plpImage?.responsiveImage ? { responsiveImage: content.plpImage.responsiveImage } : {}),
  };

  const { responsiveImage } = imageData || {};

  const { src: imageUrl } = responsiveImage || {};

  // slider
  const media = [
    <DatoImage key={0} quality={100} image={imageData} />,
    <Image
      key={1}
      alt={diamondType}
      src={generateCfyDiamondSpriteThumbUrl(diamondType)}
      sizes="100vw"
      height={0}
      width={0}
    />,
  ];

  const link = `/customize?step=2&type=setting-to-diamond&collectionSlug=${collectionSlug}&productSlug=${productSlug}&lotId=${lotId}`;

  return (
    <div className="card item-bundle">
      <div className="poster">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {media.map((v, i) => {
              return (
                <div className="embla__slide" key={`media${i}`}>
                  {v}
                </div>
              );
            })}
          </div>
        </div>
        <div className="pagination">
          <ul>
            <li>
              <button
                className={clsx({
                  active: activeSlideIndex === 0,
                })}
                onClick={() => emblaApi?.scrollTo(0)}
              >
                <DatoImage quality={100} image={imageData} />
              </button>
            </li>
            <li>
              <button
                className={clsx({
                  active: activeSlideIndex === 1,
                })}
                onClick={() => emblaApi?.scrollTo(1)}
              >
                <Image
                  key={1}
                  alt={diamondType}
                  src={generateCfyDiamondSpriteThumbUrl(diamondType)}
                  sizes="100vw"
                  height={0}
                  width={0}
                />
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="text">
        <div className="title">{bundleTitle}</div>

        <div className="action">
          <div className="price">{bundlePrice}</div>

          <UniLink route={link}>
            <DarksideButton type="solid">{button}</DarksideButton>
          </UniLink>

          {!isSharedWishlistPage && (
            <div className="share" onClick={() => handleOpenDropHintModal({ link, image: imageUrl })}>
              <DropHintIcon />
              <UIString>Drop a Hint</UIString>
            </div>
          )}
        </div>
      </div>

      {!isSharedWishlistPage && (
        <WishlistLikeButton extraClass={isWishlistPage ? 'wishlist-page' : 'wishlist-slideout'} productId={id} />
      )}
    </div>
  );
};

export { CardDiamond, CardProduct, CardBundle };

function extractNumber(inputString) {
  if (!inputString) return null;

  const match = inputString.match(/\d+(\.\d+)?/);

  if (match) {
    const result = match[0];

    return parseFloat(result);
  } else {
    return null;
  }
}

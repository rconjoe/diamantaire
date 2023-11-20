import {
  DarksideButton,
  DatoImage,
  SwiperStyles,
  SwiperCustomPagination,
  UIString,
  UniLink,
} from '@diamantaire/darkside/components/common-ui';
import { useTranslations } from '@diamantaire/darkside/data/hooks';
import { getFormattedCarat, getFormattedPrice } from '@diamantaire/shared/constants';
import { generateCfyDiamondSpriteThumbUrl, generateDiamondImageUrl, getDiamondType } from '@diamantaire/shared/helpers';
import { DropHintIcon } from '@diamantaire/shared/icons';
import { generateProductUrl } from '@diamantaire/shared-product';
import Image from 'next/image';
import { useEffect, useRef, useState, useMemo } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

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

  const { slug, handle, diamondType, carat, price, color, clarity, cut } = diamond || {};

  const _f = useMemo(() => {
    return {
      carat: `${getFormattedCarat(carat, locale)}ct`,
      price: getFormattedPrice(price, locale, true),
      type: _t(getDiamondType(diamondType)?.title),
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
  if (!content || !product) {
    return;
  }

  const { productTitle: title, price: productPrice, productType, productSlug, collectionSlug } = product;

  const price = getFormattedPrice(productPrice, locale, true);

  const imageData = {
    url: content?.plpImage?.responsiveImage?.url,
    ...(content?.plpImage?.responsiveImage ? { responsiveImage: content.plpImage.responsiveImage } : {}),
  };

  const { responsiveImage } = imageData || {};

  const { src: imageUrl } = responsiveImage || {};

  const link = generateProductUrl(productType, collectionSlug, productSlug);

  return (
    <div className="card item-product">
      <div className="poster">
        <DatoImage quality={100} image={imageData} />
      </div>
      <div className="text">
        <div className="title">{title}</div>

        <div className="price">{price}+</div>

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
  const swiperRef = useRef(null);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const [loadPagination, setLoadPagination] = useState(0);

  useEffect(() => {
    setTimeout(() => setLoadPagination(loadPagination + 1), 100);
  }, []);

  const { _t } = useTranslations(locale);

  if (!diamond || !setting?.content || !setting?.product) return;

  const { content, product } = setting;

  const { diamondType, carat, price: diamondPrice, lotId } = diamond;

  const { productTitle, price: productPrice, collectionSlug, productSlug } = product;

  const bundleTitle = `${productTitle} ${_t('with')} ${getFormattedCarat(carat, locale)}ct ${_t(
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
        <SwiperStyles>
          <Swiper
            onSlideChange={(swiper) => {
              setActiveSlideIndex(swiper.activeIndex);
            }}
            onSwiper={(swiper) => {
              return (swiperRef.current = swiper);
            }}
            lazy={{ loadPrevNext: true }}
            modules={[Pagination]}
          >
            {media.map((v, i) => {
              return <SwiperSlide key={`media${i}`}>{v}</SwiperSlide>;
            })}
            <SwiperCustomPagination
              reload={loadPagination}
              swiper={swiperRef.current}
              activeIndex={activeSlideIndex}
              thumb={media}
            />
          </Swiper>
        </SwiperStyles>
      </div>

      <div className="text">
        <div className="title">{bundleTitle}</div>

        <div className="price">{bundlePrice}+</div>

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

      {!isSharedWishlistPage && (
        <WishlistLikeButton extraClass={isWishlistPage ? 'wishlist-page' : 'wishlist-slideout'} productId={id} />
      )}
    </div>
  );
};

export { CardDiamond, CardProduct, CardBundle };

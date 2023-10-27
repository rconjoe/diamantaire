import {
  DarksideButton,
  DatoImage,
  SwiperStyles,
  SwiperCustomPagination,
  UIString,
} from '@diamantaire/darkside/components/common-ui';
import { useTranslations } from '@diamantaire/darkside/data/hooks';
import { getFormattedCarat, getFormattedPrice } from '@diamantaire/shared/constants';
import { generateCfyDiamondSpriteThumbUrl, generateDiamondImageUrl, getDiamondType } from '@diamantaire/shared/helpers';
import { DropHintIcon } from '@diamantaire/shared/icons';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { WishlistLikeButton } from './WishlistLikeButton';
import { StyledWishlistProductItem } from './WishlistProductItem.style';

interface CardBundleProps {
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
  diamond: any;
  id: string;
  button: string;
  locale: string;
}

interface CardProductProps {
  id: string;
  content: any;
  product: any;
  button: string;
  locale: string;
}

interface WishlistProductItemProps {
  locale: string;
  content: {
    buttonShop: string;
  };
  productId?: string;
  productData?: {
    [key: string]: any;
  };
}

const CardDiamond: React.FC<CardDiamondProps> = ({ id, diamond, button, locale }) => {
  const { _t } = useTranslations(locale);

  if (!diamond) return;

  const { diamondType, carat, price, color, clarity, cut } = diamond;

  const _f = {
    carat: `${getFormattedCarat(carat, locale)}ct`,
    price: getFormattedPrice(price, locale, true),
    type: _t(getDiamondType(diamondType)?.slug),
    cut: _t(cut),
    clarity: _t(clarity),
    color: _t(color),
    image: generateDiamondImageUrl(diamondType),
  };

  const title = `${_f.type}, ${_f.carat}, ${_f.cut}, ${_f.color}, ${_f.clarity}`;

  return (
    <div className="card item-diamond">
      <div className="poster">
        <Image alt={diamondType} src={generateCfyDiamondSpriteThumbUrl(diamondType)} sizes="100vw" height={0} width={0} />
      </div>
      <div className="text">
        <div className="title">{title}</div>
        <div className="price">{_f.price}</div>
        <DarksideButton type="solid">{button}</DarksideButton>
        <div className="share">
          <DropHintIcon />
          <UIString>Drop a Hint</UIString>
        </div>
      </div>
      <WishlistLikeButton extraClass="wishlist" productId={id} />
    </div>
  );
};

const CardProduct: React.FC<CardProductProps> = ({ id, product, content, button, locale }) => {
  if (!content || !product) {
    return;
  }

  const { productTitle: title, price: productPrice } = product;

  const price = getFormattedPrice(productPrice, locale, true);

  return (
    <div className="card item-product">
      <div className="poster">
        <DatoImage
          quality={100}
          image={{
            url: content?.plpImage?.responsiveImage?.url,
            ...(content?.plpImage?.responsiveImage ? { responsiveImage: content.plpImage.responsiveImage } : {}),
          }}
        />
      </div>
      <div className="text">
        <div className="title">{title}</div>
        <div className="price">{price}+</div>
        <DarksideButton type="solid">{button}</DarksideButton>
        <div className="share">
          <DropHintIcon />
          <UIString>Drop a Hint</UIString>
        </div>
      </div>
      <WishlistLikeButton extraClass="wishlist" productId={id} />
    </div>
  );
};

const CardBundle: React.FC<CardBundleProps> = ({ id, locale, button, diamond, setting }) => {
  const swiperRef = useRef(null);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const [loadPagination, setLoadPagination] = useState(0);

  useEffect(() => {
    setTimeout(() => setLoadPagination(loadPagination + 1), 100);
  }, []);

  const { _t } = useTranslations(locale);

  if (!diamond || !setting?.content || !setting?.product) return;

  const { content, product } = setting;

  const { diamondType, carat, price: diamondPrice } = diamond;

  const { productTitle, price: productPrice } = product;

  const bundleTitle = `${productTitle} ${_t('with')} ${getFormattedCarat(carat, locale)}ct ${_t(
    getDiamondType(diamondType)?.title,
  )}`;

  const bundlePrice = getFormattedPrice(productPrice + diamondPrice, locale, true);

  const media = [
    <DatoImage
      key={0}
      quality={100}
      image={{
        url: content?.plpImage?.responsiveImage?.url,
        ...(content?.plpImage?.responsiveImage ? { responsiveImage: content.plpImage.responsiveImage } : {}),
      }}
    />,
    <Image
      key={1}
      alt={diamondType}
      src={generateCfyDiamondSpriteThumbUrl(diamondType)}
      sizes="100vw"
      height={0}
      width={0}
    />,
  ];

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
        <DarksideButton type="solid">{button}</DarksideButton>
        <div className="share">
          <DropHintIcon />
          <UIString>Drop a Hint</UIString>
        </div>
      </div>
      <WishlistLikeButton extraClass="wishlist" productId={id} />
    </div>
  );
};

const WishlistProductItem: React.FC<WishlistProductItemProps> = ({
  productId,
  content: { buttonShop },
  productData,
  locale,
}) => {
  if (!productData) return;
  let card;

  if (productId.includes('diamond-') || productId.includes('cfy-')) {
    card = <CardDiamond id={productId} diamond={productData} button={buttonShop} locale={locale} />;
  }

  if (productId.includes('product-')) {
    const { product, content } = productData;

    card = <CardProduct locale={locale} product={product} content={content} button={buttonShop} id={productId} />;
  }

  if (productId.includes('bundle-')) {
    card = (
      <CardBundle setting={productData[0]} diamond={productData[1]} button={buttonShop} id={productId} locale={locale} />
    );
  }

  return <StyledWishlistProductItem>{card}</StyledWishlistProductItem>;
};

export { WishlistProductItem };

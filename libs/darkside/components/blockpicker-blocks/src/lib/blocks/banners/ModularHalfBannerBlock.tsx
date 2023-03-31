/*

Handles: MODULAR_HALF_WIDTH_BANNER_BLOCK, MODULAR_HALF_WIDTH_BLOG_SUMMARY_BLOCK

*/

import {
  Button,
  DatoImage,
  Heading,
  MobileDesktopImage,
  ShowMobileOnly,
  ShowTabletAndUpOnly,
} from '@diamantaire/darkside/components/common-ui';
import { UniLink } from '@diamantaire/darkside/core';
import { getBlockPictureAlt } from '@diamantaire/shared/helpers';
import { DatoImageType } from '@diamantaire/shared/types';
import { WHITE } from '@diamantaire/styles/darkside-styles';
import clsx from 'clsx';
import Markdown from 'markdown-to-jsx';

import { ModularHalfBannerBlockContainer } from './ModularHalfBannerBlock.style';

type ModularHalfWidthBannerBlockProps = {
  title: string;
  mobileTitle: string;
  subTitle?: string;
  desktopImage?: DatoImageType;
  mobileImage?: DatoImageType;
  middleLayerImage?: DatoImageType;
  middleLayerImageMobile?: DatoImageType;
  desktopCopy?: string;
  mobileCopy?: string;
  ctaCopy: string;
  ctaCopy2?: string;
  ctaCopy3?: string;
  ctaRoute?: string;
  ctaRoute2?: string;
  ctaRoute3?: string;
  ctaButtonType?: string;
  ctaButtonType2?: string;
  ctaButtonType3?: string;
  alt?: string;
  headingType?: string;
  textBlockAlignment?: string;
  textColor?: string;
  isTextBlockWide?: boolean;
  headingAdditionalClass?: string;
  subtitleAdditionalClass?: string;
  additionalClass?: string;
  blogPost?: {
    title: string;
    excerpt: string;
    slug: string;
  };
};

const ModularHalfWidthBannerBlock = ({
  title,
  mobileTitle,
  subTitle,
  desktopImage,
  mobileImage,
  desktopCopy,
  mobileCopy,
  ctaCopy,
  ctaCopy2,
  ctaCopy3,
  ctaRoute,
  ctaRoute2,
  ctaRoute3,
  ctaButtonType = 'secondary',
  ctaButtonType2 = 'secondary',
  ctaButtonType3 = 'secondary',
  headingType,
  textBlockAlignment,
  textColor,
  isTextBlockWide,
  headingAdditionalClass,
  subtitleAdditionalClass,
  additionalClass,
  blogPost,
  middleLayerImage,
  middleLayerImageMobile,
}: ModularHalfWidthBannerBlockProps) => {
  const renderHalfWidthBlockTitle = (title) => {
    return (
      <Heading
        type={headingType ? headingType : 'h2'}
        className={clsx(
          headingAdditionalClass ? headingAdditionalClass : 'h1',
          'banner half-width-banner__title',
          'primary',
          {
            '-white': textColor?.toLowerCase() === 'white',
          },
        )}
      >
        <Markdown options={{ forceInline: true }}>{blogPost?.title ? blogPost.title : title}</Markdown>
      </Heading>
    );
  };

  return (
    <ModularHalfBannerBlockContainer className="container-emotion -vertical-margins">
      <div
        className={clsx('half-width__image-wrapper', {
          '-left': textBlockAlignment?.toLowerCase() === 'left',
          '-right': textBlockAlignment?.toLowerCase() === 'right',
        })}
      >
        <MobileDesktopImage
          desktopImage={desktopImage}
          mobileImage={mobileImage}
          alt={getBlockPictureAlt({
            desktopImage,
            title,
          })}
          className={clsx({
            '-left': textBlockAlignment?.toLowerCase() === 'left',
            '-right': textBlockAlignment?.toLowerCase() === 'right',
          })}
        />
      </div>

      {middleLayerImage && (
        <ShowTabletAndUpOnly>
          <div className={clsx('half-width__middle-layer-image', additionalClass)}>
            <DatoImage
              image={middleLayerImage}
              overrideAlt={getBlockPictureAlt({
                desktopImage: middleLayerImage,
                title,
              })}
            />
          </div>
        </ShowTabletAndUpOnly>
      )}

      {middleLayerImageMobile && (
        <ShowMobileOnly>
          <div className={clsx('half-width__mobile-middle-layer-image', additionalClass)}>
            <DatoImage
              image={middleLayerImageMobile}
              overrideAlt={getBlockPictureAlt({
                desktopImage: middleLayerImageMobile,
                title,
              })}
            />
          </div>
        </ShowMobileOnly>
      )}

      <div
        className={clsx(
          'half-width-banner__text -bg',
          {
            '-left': textBlockAlignment?.toLowerCase() === 'left',
            '-right': textBlockAlignment?.toLowerCase() === 'right',
            '-white': textColor?.toLowerCase() === 'white',
            '-wide': isTextBlockWide,
          },
          additionalClass,
        )}
      >
        {title && mobileTitle && (
          <>
            <ShowMobileOnly>{renderHalfWidthBlockTitle(mobileTitle)}</ShowMobileOnly>
            <ShowTabletAndUpOnly>{renderHalfWidthBlockTitle(title)}</ShowTabletAndUpOnly>
          </>
        )}
        {title && !mobileTitle && renderHalfWidthBlockTitle(title)}
        {(blogPost?.excerpt || subTitle) && (
          <div
            className={clsx(
              'half-width-banner__caption',
              {
                '-white': textColor?.toLowerCase() === 'white',
              },
              subtitleAdditionalClass,
            )}
          >
            <Markdown options={{ forceInline: true }}>
              {blogPost?.excerpt ? `<p>${blogPost?.excerpt}</p>` : subTitle}
            </Markdown>
          </div>
        )}

        <div
          className={clsx(
            'half-width-banner__copy',
            {
              '-white': textColor?.toLowerCase() === 'white',
            },
            additionalClass,
          )}
        >
          {desktopCopy && (
            <ShowTabletAndUpOnly>
              <Markdown options={{ forceBlock: true }}>{desktopCopy}</Markdown>
            </ShowTabletAndUpOnly>
          )}

          {mobileCopy && (
            <ShowMobileOnly>
              <Markdown options={{ forceBlock: true }}>{mobileCopy}</Markdown>
            </ShowMobileOnly>
          )}
        </div>

        <div className="cta">
          {(ctaRoute || blogPost?.slug) && (
            <UniLink route={ctaRoute || `/journal/post/${blogPost?.slug}`}>
              <Button
                className={clsx('-mobile-wide', ctaButtonType, additionalClass, {
                  '-inverse-tabletAndUp': textColor === WHITE,
                })}
              >
                {ctaCopy}
              </Button>
            </UniLink>
          )}
          {ctaRoute && ctaRoute2 && (
            <UniLink route={ctaRoute2}>
              <Button
                className={clsx('second-button', ctaButtonType2, additionalClass, {
                  '-inverse-tabletAndUp': textColor === WHITE,
                })}
              >
                {ctaCopy2}
              </Button>
            </UniLink>
          )}
          {ctaRoute && ctaRoute2 && ctaRoute3 && (
            <UniLink route={ctaRoute3}>
              <Button
                className={clsx('second-button', ctaButtonType3, additionalClass, {
                  '-inverse-tabletAndUp': textColor === WHITE,
                })}
              >
                {ctaCopy3}
              </Button>
            </UniLink>
          )}
        </div>
      </div>
    </ModularHalfBannerBlockContainer>
  );
};

export default ModularHalfWidthBannerBlock;

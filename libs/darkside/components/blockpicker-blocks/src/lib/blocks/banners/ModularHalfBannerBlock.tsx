/*

Handles: MODULAR_HALF_WIDTH_BANNER_BLOCK, MODULAR_HALF_WIDTH_BLOG_SUMMARY_BLOCK

*/

import {
  DarksideButton,
  DatoDarksideButtonProps,
  DatoImage,
  Heading,
  MobileDesktopImage,
  ShowMobileOnly,
  ShowTabletAndUpOnly,
} from '@diamantaire/darkside/components/common-ui';
import { getBlockPictureAlt } from '@diamantaire/shared/helpers';
import { DatoImageType } from '@diamantaire/shared/types';
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
  darksideButtons: DatoDarksideButtonProps[];
  ctaCopy?: string;
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
  darksideButtons,
  headingType,
  ctaCopy,
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
    <ModularHalfBannerBlockContainer className="container-wrapper -vertical-margins">
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
          {darksideButtons?.map((button) => {
            return (
              <DarksideButton
                colorTheme={button.ctaButtonColorTheme}
                mobileColorTheme={button.ctaButtonMobileColorTheme}
                href={button.ctaLinkUrl}
                key={button.id}
                type={button.ctaButtonType}
              >
                {button.ctaCopy}
              </DarksideButton>
            );
          })}

          {blogPost?.slug && (
            <DarksideButton colorTheme={'black'} href={`/journal/post/${blogPost?.slug}`} type={'outline'}>
              {ctaCopy}
            </DarksideButton>
          )}
        </div>
      </div>
    </ModularHalfBannerBlockContainer>
  );
};

export default ModularHalfWidthBannerBlock;

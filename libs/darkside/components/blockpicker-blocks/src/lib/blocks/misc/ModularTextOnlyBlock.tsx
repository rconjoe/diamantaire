import { Heading, ShowMobileOnly, ShowTabletAndUpOnly, Button, Markdown } from '@diamantaire/darkside/components/common-ui';
import { UniLink } from '@diamantaire/darkside/core';
import clsx from 'clsx';

import { ModularTextOnlyBlockContainer } from './ModularTextOnlyBlock.style';

type ModularTextOnlyBlockProps = {
  title?: string;
  ctaCopy: string;
  ctaRoute: string;
  desktopCopy?: string;
  mobileCopy?: string;
  mobileButtonClass: string;
  tabletAndUpButtonClass: string;
  titleStyle?: string;
  titleFont?: string;
  copy?: string;
  additionalClass?: string;
  headingType?: string;
  headingAdditionalClass?: string;
  blogCopy?: string;
  ctaCopy2?: string;
  ctaRoute2?: string;
  ctaButtonType2?: string;
};

const ModularTextOnlyBlock = ({
  title,
  titleStyle,
  titleFont,
  ctaCopy,
  ctaRoute,
  ctaCopy2,
  ctaRoute2,
  ctaButtonType2,
  desktopCopy,
  mobileCopy,
  copy,
  mobileButtonClass = 'secondary',
  tabletAndUpButtonClass = 'secondary',
  additionalClass,
  headingType,
  headingAdditionalClass,
  blogCopy,
}: ModularTextOnlyBlockProps) => {
  const hasSecondCTA = Boolean(ctaRoute2) && Boolean(ctaCopy2);

  return (
    <ModularTextOnlyBlockContainer className="container-emotion" titleFont={titleFont} titleStyle={titleStyle}>
      <div
        className={clsx('text-block__wrapper', additionalClass, {
          '-no-max-width': blogCopy,
        })}
      >
        <div className="text-block__container">
          {title && (
            <Heading
              type={headingType}
              className={clsx('text-block__title primary', headingAdditionalClass, additionalClass, {
                '-blog': blogCopy,
              })}
            >
              {title}
            </Heading>
          )}
          {blogCopy && (
            <>
              <ShowTabletAndUpOnly>
                <p className={clsx('text-block__copy -blog', additionalClass)}>{blogCopy}</p>
              </ShowTabletAndUpOnly>
              <ShowMobileOnly>
                <p className={clsx('text-block__copy -blog')}>{blogCopy}</p>
              </ShowMobileOnly>
            </>
          )}
          {desktopCopy && (
            <ShowTabletAndUpOnly>
              <p className={clsx('text-block__copy', additionalClass)}>{desktopCopy}</p>
            </ShowTabletAndUpOnly>
          )}
          {mobileCopy && (
            <ShowMobileOnly>
              <p className="text-block__copy">{mobileCopy}</p>
            </ShowMobileOnly>
          )}
          {copy && <Markdown extraClass={'-textOnlyBlock ' + additionalClass}>{copy}</Markdown>}
          {ctaCopy || hasSecondCTA ? (
            <div
              className={clsx('text-block__button-wrapper', additionalClass, {
                '-has-smaller-margin': hasSecondCTA,
              })}
            >
              {ctaCopy && (
                <>
                  <ShowTabletAndUpOnly>
                    <UniLink route={ctaRoute}>
                      <Button className={tabletAndUpButtonClass}>{ctaCopy}</Button>
                    </UniLink>
                  </ShowTabletAndUpOnly>
                  <div className="text-block__mobile-button-wrapper">
                    <ShowMobileOnly>
                      <UniLink route={ctaRoute}>
                        <Button className={mobileButtonClass}>{ctaCopy}</Button>
                      </UniLink>
                    </ShowMobileOnly>
                  </div>
                </>
              )}
              {hasSecondCTA && (
                <UniLink route={ctaRoute2}>
                  <Button className={clsx(ctaButtonType2, 'second-button')}>{ctaCopy2}</Button>
                </UniLink>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </ModularTextOnlyBlockContainer>
  );
};

// Block.propTypes = propTypes;
// TextOnlyBlock.propTypes = textOnlyPropTypes;

export default ModularTextOnlyBlock;

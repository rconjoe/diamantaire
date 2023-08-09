import {
  Heading,
  ShowMobileOnly,
  ShowTabletAndUpOnly,
  Markdown,
  DatoDarksideButtonProps,
  DarksideButton,
} from '@diamantaire/darkside/components/common-ui';
import clsx from 'clsx';

import { ModularTextOnlyBlockContainer } from './ModularTextOnlyBlock.style';

type ModularTextOnlyBlockProps = {
  title?: string;
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
  darksideButtons: DatoDarksideButtonProps[];
};

const ModularTextOnlyBlock = ({
  title,
  titleStyle,
  titleFont,
  darksideButtons,
  desktopCopy,
  mobileCopy,
  copy,
  additionalClass,
  headingType,
  headingAdditionalClass,
  blogCopy,
}: ModularTextOnlyBlockProps) => {
  return (
    <ModularTextOnlyBlockContainer className="container-wrapper" titleFont={titleFont} titleStyle={titleStyle}>
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
          {darksideButtons.length > 0 ? (
            <div
              className={clsx('text-block__button-wrapper', additionalClass, {
                '-has-smaller-margin': darksideButtons.length > 1,
              })}
            >
              {darksideButtons?.map((button) => {
                return (
                  <DarksideButton
                    key={button.id}
                    type={button.ctaButtonType}
                    colorTheme={button.ctaButtonColorTheme}
                    href={button.ctaLinkUrl}
                  >
                    {button.ctaCopy}
                  </DarksideButton>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </ModularTextOnlyBlockContainer>
  );
};

export default ModularTextOnlyBlock;

import { Markdown, UniLink, DarksideButton } from '@diamantaire/darkside/components/common-ui';
import { DatoDarksideButtonProps } from '@diamantaire/shared/types';
import { AccordionButton, AccordionItem, AccordionPanel } from '@reach/accordion';
import clsx from 'clsx';

import { ModularAccordionItemContainer } from './ModularAccordionItem.style';

export interface ModularAccordionItemProps {
  title: string;
  copy: string;
  ctacopy?: string;
  ctaroute?: string;
  supportedCountries?: Array<{
    code: string;
  }>;
  className?: string;
  darksideButtons: DatoDarksideButtonProps[];
}

const ModularAccordionItem = ({ title, copy, ctacopy, ctaroute, darksideButtons }: ModularAccordionItemProps) => {
  return (
    <ModularAccordionItemContainer>
      <AccordionItem className="acc-item__container">
        <AccordionButton className="acc-item__header">
          <h3>{title}</h3>
          <span className={clsx(['acc-item__header-icon', 'plus'])}>+</span>
          <span className={clsx(['acc-item__header-icon', 'minus'])}>-</span>
        </AccordionButton>
        <AccordionPanel className="slide-down">
          <div className="acc-item__icon-header-copy">
            <Markdown>{copy}</Markdown>
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

            {ctacopy && ctaroute && (
              <UniLink route={ctaroute} className="acc-item__cta-link">
                {ctacopy}
              </UniLink>
            )}
          </div>
        </AccordionPanel>
      </AccordionItem>
    </ModularAccordionItemContainer>
  );
};

export { ModularAccordionItem };

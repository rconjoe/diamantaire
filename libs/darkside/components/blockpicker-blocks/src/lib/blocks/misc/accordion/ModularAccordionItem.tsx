import { Markdown } from '@diamantaire/darkside/components/common-ui';
import { UniLink } from '@diamantaire/darkside/core';
import { AccordionButton, AccordionItem, AccordionPanel } from '@reach/accordion';
import clsx from 'clsx';

import { ModularAccordionItemContainer } from './ModularAccordionItem.style';

export interface ModularAccordionItemProps {
  title: string;
  copy: string;
  ctacopy?: string;
  ctaroute?: string;
  supportedCountries?: Array<string>;
  className?: string;
}

const ModularAccordionItem = ({ title, copy, ctacopy, ctaroute }: ModularAccordionItemProps) => {
  return (
    <ModularAccordionItemContainer>
      <AccordionItem className="acc-item__container">
        <AccordionButton className="acc-item__header">
          <h3>{title}</h3>
          <span className={clsx(['acc-item__header-icon', 'plus'])}>+</span>
          <span className={clsx(['acc-item__header-icon', 'minus'])}>-</span>
        </AccordionButton>
        <AccordionPanel className="slide-down">
          <div className="acc-item__icon-header-cion">
            <Markdown>{copy}</Markdown>
            {ctacopy && ctaroute && (
              <UniLink route={ctaroute} className="acc-item">
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

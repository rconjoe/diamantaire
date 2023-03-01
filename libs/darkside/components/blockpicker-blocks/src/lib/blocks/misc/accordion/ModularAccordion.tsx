import { Markdown, Button, DatoImage } from '@diamantaire/darkside/components/common-ui';
import { UniLink } from '@diamantaire/darkside/core';
import { Accordion } from '@reach/accordion';
import clsx from 'clsx';
import { useState } from 'react';

import FAQSchema from './FAQSchema';
import { ModularAccordionContainer } from './ModularAccordion.style';
import { ModularAccordionItem, ModularAccordionItemProps } from './ModularAccordionItem';

type ModularAccordionProps = {
  title: string;
  copy?: string;
  ctaCopy?: string;
  ctaRoute?: string;
  ctaButtonType?: string;
  image?: {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
    responsiveImage?: {
      width: number;
      height: number;
      base64: string;
    };
  };
  firstItemOpen: boolean;
  shouldUseFaqSchema: boolean;
  accordionItems: Array<ModularAccordionItemProps>;
  bottomCopy?: string;
  countryCode?: string;
};

const ModularAccordion = ({
  title,
  copy,
  ctaCopy,
  ctaRoute,
  ctaButtonType,
  image,
  accordionItems,
  firstItemOpen,
  shouldUseFaqSchema,
  bottomCopy,
  countryCode,
}: ModularAccordionProps) => {
  const [indice, setIndice] = useState(firstItemOpen ? 0 : -1);

  const additionalOptions = {
    ...(firstItemOpen && { defaultIndex: 0 }),
  };

  const hasImage = Boolean(image);

  const getFAQSchemaData = () => {
    return accordionItems.map((item) => {
      return {
        question: item.title,
        answer: item.copy,
      };
    });
  };

  const handleChange = (value) => {
    if (indice !== value) {
      window.dispatchEvent(
        new CustomEvent('gtmAccordion', {
          detail: {
            accordionTitle: title,
            sectionTitle: accordionItems[value].title,
            sectionDetail: accordionItems[value].title,
          },
        }),
      );
    }

    setIndice(indice === value ? null : value);
  };

  return (
    <ModularAccordionContainer>
      {shouldUseFaqSchema && <FAQSchema questionAnswerData={getFAQSchemaData()} />}
      <div
        className={clsx('acc__container container-emotion', {
          '-with-image': hasImage,
        })}
      >
        {image && (
          <div className="acc__image-container">
            <div className="acc__sticky-wrapper">
              <DatoImage image={image} />
            </div>
          </div>
        )}
        <div className={clsx(['acc__accordion', { '-with-image': hasImage }])}>
          <h2 className={clsx(['accordion__title', { '-with-image': hasImage }])}>{title}</h2>

          {copy && (
            <div className="accordion__copy">
              <Markdown>{copy}</Markdown>
            </div>
          )}

          {ctaRoute && (
            <UniLink route={ctaRoute}>
              <Button className={clsx(ctaButtonType, '-mobile-wide')}>{ctaCopy}</Button>
            </UniLink>
          )}

          <Accordion onChange={handleChange} collapsible={true} {...additionalOptions}>
            {accordionItems.map((item, index) => {
              // If there are supported countries listed, check to see if its supported.
              if (item.supportedCountries?.length && !item.supportedCountries.includes(countryCode)) {
                return null;
              }

              return <ModularAccordionItem key={index.toString()} {...item} />;
            })}
            {bottomCopy && (
              <div className="accordion__bottom-copy">
                <Markdown>{bottomCopy}</Markdown>
              </div>
            )}
          </Accordion>
        </div>
      </div>
    </ModularAccordionContainer>
  );
};

export default ModularAccordion;

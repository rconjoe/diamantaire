import { Markdown, DatoImage, DarksideButton } from '@diamantaire/darkside/components/common-ui';
import { DatoImageType, DatoDarksideButtonProps } from '@diamantaire/shared/types';
import { Accordion } from '@reach/accordion';
import clsx from 'clsx';
import { useState } from 'react';

import { ModularAccordionContainer } from './ModularAccordion.style';
import { ModularAccordionItem, ModularAccordionItemProps } from './ModularAccordionItem';

type ModularAccordionProps = {
  title: string;
  copy?: string;
  image?: DatoImageType;
  firstItemOpen: boolean;
  shouldUseFaqSchema: boolean;
  accordionItems: Array<ModularAccordionItemProps>;
  bottomCopy?: string;
  countryCode?: string;
  shouldLazyLoad?: boolean;
  darksideButtons: DatoDarksideButtonProps[];
};

// temp

const ModularAccordion = ({
  title,
  copy,
  image,
  accordionItems,
  firstItemOpen,
  // shouldUseFaqSchema,
  bottomCopy,
  countryCode,
  shouldLazyLoad,
  darksideButtons,
}: ModularAccordionProps) => {
  const [indice, setIndice] = useState(firstItemOpen ? 0 : -1);

  const additionalOptions = {
    ...(firstItemOpen && { defaultIndex: 0 }),
  };

  const hasImage = Boolean(image);

  // const getFAQSchemaData = () => {
  //   return accordionItems.map((item) => {
  //     return {
  //       question: item.title,
  //       answer: item.copy,
  //     };
  //   });
  // };

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
      <div
        className={clsx('acc__container container-wrapper', {
          '-with-image': hasImage,
        })}
      >
        {image && (
          <div className="acc__image-container">
            <div className="acc__sticky-wrapper">
              <DatoImage image={image} shouldLazyLoad={shouldLazyLoad} />
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

          <Accordion onChange={handleChange} collapsible={true} {...additionalOptions}>
            {accordionItems.map((item, index) => {
              // If there are supported countries listed, check to see if its supported.
              if (
                item.supportedCountries.length > 0 &&
                item.supportedCountries.filter((country) => country.code === countryCode).length === 0
              ) {
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

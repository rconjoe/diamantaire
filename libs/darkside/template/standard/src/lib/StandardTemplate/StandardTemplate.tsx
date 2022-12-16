import { ReactElement, ReactNode, useState } from 'react';
import { getTemplate as getGlobalTemplate } from '@diamantaire/darkside/template/global';
import styles from './StandardTemplate.module.css';

/* eslint-disable-next-line */
export interface StandardTemplateProps {
  children: ReactNode;
}

export const HEADER_NAV_QUERY = `
query headerNavigationDynamicQuery($locale: SiteLocale) {
    headerNavigationDynamic(locale: $locale) {
      section {
        title
        key
        route
        columns {
          columnTitle
          route
          colKey
          links {
            _modelApiKey
            id
            copy
            route
            isBold
            linkKey
            flags
            nestedLinks {
              id
              copy
              route
              isBold
            }
            supportedCountries {
              code
            }
          }
        }
      }
      mobileAccordionOrder {
        key
        label
        isCollapsible
      }
      mobileLocalizationAccordionOrder {
        key
        isCollapsible
        label
      }
      iconsAltText {
        key
        value
      }
    }
  }
`;

export function StandardTemplate({ children }: StandardTemplateProps) {
  const [thing, setThing] = useState('default-state');

  return (
    <div className={styles['container']}>
      ****STANDARD TEMPLATE****
      <h3>{thing}</h3>
      <button onClick={() => setThing('mutated-state')}>MUTATE</button>
      {children}
    </div>
  );
}

export const getTemplate = (page: ReactElement) =>
  getGlobalTemplate(<StandardTemplate>{page}</StandardTemplate>);

export default StandardTemplate;

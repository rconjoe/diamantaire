import React from 'react';
import { getUIStrings } from '../store/selectors/data';
import { mapStr } from './language';
import { getBaseCountrySiteUrl } from '.';
import { getCountryCode } from '../store/selectors/geolocation';
import { getSlug } from '../store/selectors/activeProduct';

const getBreadcrumbSchema = (state, HOME_TEXT, breadcrumbs) => {
  const baseUrl = getBaseCountrySiteUrl(getCountryCode(state));
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@id': baseUrl + '/',
          name: HOME_TEXT,
        },
      },
    ],
  };

  schema['itemListElement'] = schema['itemListElement'].concat(
    breadcrumbs.map((breadcrumb, index) => {
      const link = breadcrumb.link ? breadcrumb.link.slug : getSlug(state);

      return {
        '@type': 'ListItem',
        position: index + 2,
        item: {
          '@id': baseUrl + '/' + link,
          name: breadcrumb.name,
        },
      };
    })
  );

  return schema;
};

const getBreadcrumbs = (state, styles, breadcrumbs) => {
  if (!breadcrumbs) {
    breadcrumbs = [];
  }
  //Adding Home to breadcrumb list
  const uiStrings = getUIStrings(state);
  const HOME_TEXT = mapStr(uiStrings, 'Home');
  const numberOfBreadcrumbs = breadcrumbs.length;
  const schema = getBreadcrumbSchema(state, HOME_TEXT, breadcrumbs);

  return !numberOfBreadcrumbs ? (
    <div className={styles.breadcrumbContainer}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `\n${JSON.stringify(schema, null, 2)}\n`,
        }}
      />
      <ol>
        <li key={'breadcrumb-home'}>
          {' '}
          <a href="/">{HOME_TEXT}</a>
        </li>
      </ol>
    </div>
  ) : (
    <div className={styles.breadcrumbContainer}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `\n${JSON.stringify(schema, null, 2)}\n`,
        }}
      />
      <ol>
        <li key={'breadcrumb-home'}>
          {' '}
          <a href="/">{HOME_TEXT} &nbsp;/&nbsp;</a>
        </li>
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === numberOfBreadcrumbs - 1;
          const breadcrumbMarkup = isLast ? (
            <li key={'breadcrumb-' + index}>
              <span className={styles.lastBreadcrumb}>{breadcrumb.name}</span>
            </li>
          ) : (
            <li key={'breadcrumb-' + index}>
              <a href={'/' + breadcrumb.link.slug}>{breadcrumb.name}</a>
              &nbsp;/&nbsp;
            </li>
          );

          return breadcrumbMarkup;
        })}
      </ol>
    </div>
  );
};

export default getBreadcrumbs;

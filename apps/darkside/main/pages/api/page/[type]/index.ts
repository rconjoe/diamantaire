import { STANDARD_PAGE_BY_SLUG } from '@diamantaire/darkside/data/api';
import type { NextApiRequest, NextApiResponse } from 'next';

async function fetchDatoQuery(query: string, variables: Record<string, string>) {
  const url = 'https://graphql.datocms.com/preview';

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${process.env['NEXT_PUBLIC_DATO_READ_ONLY_TOKEN']}`,
    },
    method: 'POST',
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (response.status !== 200) {
    throw new Error(await response.text());
  }

  return response;
}

type ResponseData = {
  message: string;
  json?: Record<string, string | string[]>;
};

type ErrorData = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData | ErrorData>) {
  console.log('template data request made', req.query);
  res.setHeader('Cache-Control', 's-maxage=86400');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*'); // replace this your actual origin
  res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  );
  const { slug } = req.query;
  const locale = 'en_US'; // TODO: get locale from query

  try {
    const response = await fetchDatoQuery(STANDARD_PAGE_BY_SLUG, { locale, slug: slug.toLocaleString() });
    const jsonResponse = await response.json();

    return res.status(200).json(jsonResponse.data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
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
    footerNavigation(locale: $locale) {
      columns {
        title
        links {
          route
          copy
          flags
          supportedCountries {
            code
          }
        }
      }
      emailSignUpColumn {
        ctaCopy
        copy
        title
      }
      emailSignUpCopy {
        emailInputPlaceholder
        emailInputEmpty
        emailInputNotValid
        emailInputBeingSent
        emailInputSuccessfullySent
        emailInputUnsuccessfullySent
        gdprOptInCopy
        gdprCtaCopy
        gdprCtaRoute
        phoneInputPlaceholder
      }
      copyright
      countryPicker {
        ... on BasicTextLabelRecord {
          key
          copy
        }
        ... on CountryPickerColumnRecord {
          label
          countries
        }
      }
    }
  }
`;

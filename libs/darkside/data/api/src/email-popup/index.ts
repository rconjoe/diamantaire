import { queryDatoGQL } from '../clients';
import { ButtonFragment } from '../fragments';

const EMAIL_POPUP_QUERY = `
query emailPopup($locale: SiteLocale) {
    emailPopup(locale: $locale) {
      image {
        url
        blurUpThumb(quality: 10)
      }
      title
      copy
      countrySpecificCopy {
        countryCode
        copy
      }
      placeholder1
      placeholder2
      optInCopy
      privacyctacopy
      privacyctalink
      submitCopy
      successCopy
      errorCopy
      copyPrices {
        prices {
          priceValue
          currencyCode
        }
      }
      supportedCountries {
        code
        name
      }
      darksideButtons {
        ${ButtonFragment}
      }
    }
  }
  `;

export async function fetchEmailPopupData(locale: string) {
  const emailPopupData = await queryDatoGQL({
    query: EMAIL_POPUP_QUERY,
    variables: { locale },
  });

  return emailPopupData;
}

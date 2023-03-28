import { useRouter } from 'next/router';
import { useState } from 'react';

enum LanguageCode {
  English = 'en',
  French = 'fr',
  German = 'de',
  Spanish = 'es',
}

enum CountryCode {
  Austria = 'AT',
  Australia = 'AU',
  Belgium = 'BE',
  Bulgaria = 'BG',
  Canada = 'CA',
  China = 'CN',
  Croatia = 'HR',
  Cyprus = 'CY',
  Czechia = 'CZ',
  Denmark = 'DK',
  Estonia = 'EE',
  Finland = 'FI',
  France = 'FR',
  Germany = 'DE',
  Greece = 'GR',
  Hungary = 'HU',
  HongKong = 'HK',
  International = 'International',
  Ireland = 'IE',
  Italy = 'IT',
  Japan = 'JP',
  Latvia = 'LV',
  Lithuania = 'LT',
  Luxembourg = 'LU',
  Malta = 'MT',
  Netherlands = 'NL',
  Norway = 'NO',
  Poland = 'PL',
  Portugal = 'PT',
  Romania = 'RO',
  Singapore = 'SG',
  Slovakia = 'SK',
  Slovenia = 'SI',
  SouthKorea = 'KR',
  Spain = 'ES',
  Sweden = 'SE',
  Switzerland = 'CH',
  Taiwan = 'TW',
  UnitedKingdom = 'GB',
  UnitedStates = 'US',
}

enum Region {
  AsiaPacific = 'Asia / Pacific',
  Europe = 'Europe',
  NorthAmerica = 'North America',
  Other = 'All other countries / regions',
}

interface Country {
  name: string;
  countryCode: CountryCode;
  languages: LanguageCode[];
  region: Region;
  vat?: number;
}

const LANGUAGES: { [code: string]: string } = {
  [LanguageCode.English]: 'English',
  [LanguageCode.French]: 'French',
  [LanguageCode.German]: 'German',
  [LanguageCode.Spanish]: 'Spanish',
};

const COUNTRIES: { [countryCode: string]: Country } = {
  [CountryCode.Australia]: {
    name: 'Australia',
    countryCode: CountryCode.Australia,
    languages: [LanguageCode.English],
    region: Region.AsiaPacific,
  },
  [CountryCode.Canada]: {
    name: 'Canada',
    countryCode: CountryCode.Canada,
    languages: [LanguageCode.English, LanguageCode.French],
    region: Region.NorthAmerica,
  },
  [CountryCode.France]: {
    name: 'France',
    countryCode: CountryCode.France,
    languages: [LanguageCode.French, LanguageCode.English],
    region: Region.Europe,
  },
  [CountryCode.Germany]: {
    name: 'Germany',
    countryCode: CountryCode.Germany,
    languages: [LanguageCode.German, LanguageCode.English],
    region: Region.Europe,
  },
  [CountryCode.Spain]: {
    name: 'Spain',
    countryCode: CountryCode.Spain,
    languages: [LanguageCode.Spanish, LanguageCode.English],
    region: Region.Europe,
  },
  [CountryCode.UnitedStates]: {
    name: 'United States',
    countryCode: CountryCode.UnitedStates,
    languages: [LanguageCode.English],
    region: Region.NorthAmerica,
  },
};

const DEFAULT_COUNTRY_CODE = CountryCode.UnitedStates;
const DEFAULT_LANGUAGE_CODE = LanguageCode.English;

function getLocale(languageCode: LanguageCode, countryCode: CountryCode): string {
  if (!languageCode || !countryCode) {
    return getLocale(DEFAULT_LANGUAGE_CODE, DEFAULT_COUNTRY_CODE);
  }

  return `${languageCode.toLowerCase()}-${countryCode.toUpperCase()}`;
}

function getLanguageAndCountryFromLocale(locale: string): [LanguageCode, CountryCode] {
  return [locale.split('-')[0] as LanguageCode, locale.split('-')[1] as CountryCode];
}

export function getDatoRequestLocale(locale: string): string {
  const [languageCode /* countryCode */] = locale.split('-');

  if (languageCode === LanguageCode.English || !Object.values(LanguageCode).includes(languageCode as LanguageCode)) {
    return 'en_US';
  } else {
    return languageCode;
  }
}

const LocaleSelector = ({ locale }: { locale: string }) => {
  const router = useRouter();
  const [currentLanguageCode, currentCountryCode] = getLanguageAndCountryFromLocale(locale);
  const [selectedCountryCode, selectCountryCode] = useState<CountryCode>(currentCountryCode || DEFAULT_COUNTRY_CODE);
  const [selectedLanguageCode, selectLanguageCode] = useState<LanguageCode>(currentLanguageCode || DEFAULT_LANGUAGE_CODE);
  const selectedLocale = getLocale(selectedLanguageCode, selectedCountryCode);
  const selectedCountry = COUNTRIES[selectedCountryCode];

  const onCountrySelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountryCode = event.target.value;
    const newCountries = COUNTRIES[newCountryCode];
    const primaryLanguageCode = newCountries.languages[0];

    selectCountryCode(newCountryCode as CountryCode);
    if (newCountries.languages.includes(selectedLanguageCode)) {
      router.push(router.asPath, undefined, { locale: getLocale(selectedLanguageCode, newCountryCode as CountryCode) });
    } else {
      selectLanguageCode(primaryLanguageCode);
      router.push(router.asPath, undefined, { locale: getLocale(primaryLanguageCode, newCountryCode as CountryCode) });
    }
  };

  const onLanguageSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguageCode = event.target.value;

    selectLanguageCode(newLanguageCode as LanguageCode);
    router.push(router.asPath, undefined, { locale: getLocale(newLanguageCode as LanguageCode, selectedCountryCode) });
  };

  return (
    <div>
      <strong>Current Locale:</strong> {selectedLocale}
      <br />
      <select onChange={onCountrySelect} defaultValue={selectedCountryCode}>
        {Object.values(COUNTRIES).map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.name}
          </option>
        ))}
      </select>
      {selectedCountry.languages.length > 1 && (
        <select onChange={onLanguageSelect} defaultValue={selectedLanguageCode}>
          {selectedCountry.languages.map((languageCode) => (
            <option key={languageCode} value={languageCode} selected={selectedLanguageCode === languageCode}>
              {LANGUAGES[languageCode]}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export { LocaleSelector };

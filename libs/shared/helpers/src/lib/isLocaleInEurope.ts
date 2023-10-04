const isLocaleInEurope = (locale) => {
  const euMemberCountries = [
    { country: 'Austria', locale: 'de-AT' },
    { country: 'Belgium', locale: 'nl-BE' },
    { country: 'Bulgaria', locale: 'bg-BG' },
    { country: 'Croatia', locale: 'hr-HR' },
    { country: 'Cyprus', locale: 'el-CY' },
    { country: 'Czech Republic', locale: 'cs-CZ' },
    { country: 'Denmark', locale: 'da-DK' },
    { country: 'Estonia', locale: 'et-EE' },
    { country: 'Finland', locale: 'fi-FI' },
    { country: 'France', locale: 'fr-FR' },
    { country: 'Germany', locale: 'de-DE' },
    { country: 'Greece', locale: 'el-GR' },
    { country: 'Hungary', locale: 'hu-HU' },
    { country: 'Ireland', locale: 'en-IE' },
    { country: 'Italy', locale: 'it-IT' },
    { country: 'Latvia', locale: 'lv-LV' },
    { country: 'Lithuania', locale: 'lt-LT' },
    { country: 'Luxembourg', locale: 'fr-LU' },
    { country: 'Malta', locale: 'mt-MT' },
    { country: 'Netherlands', locale: 'nl-NL' },
    { country: 'Poland', locale: 'pl-PL' },
    { country: 'Portugal', locale: 'pt-PT' },
    { country: 'Romania', locale: 'ro-RO' },
    { country: 'Slovakia', locale: 'sk-SK' },
    { country: 'Slovenia', locale: 'sl-SI' },
    { country: 'Spain', locale: 'es-ES' },
    { country: 'Sweden', locale: 'sv-SE' },
  ];

  const response = euMemberCountries.find((v) => v.locale === locale);

  return response ? true : false;
};

export { isLocaleInEurope };

export default isLocaleInEurope;

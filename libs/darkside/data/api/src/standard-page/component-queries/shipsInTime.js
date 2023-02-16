const shipsInTime = `
    query shipsInTime($locale: SiteLocale) {
        shipsInTime(locale: $locale) {
            isEnabled
            startDate
            endDate
            countrySpecificEndDate {
                countryCode
                datetime
            }
            icon {
                url
            }
            mtoIcon {
                url
            }
            plpIcon {
                url
            }
            backgroundColor {
                hex
            }
            textColor {
                hex
            }
            bulkShippingBusinessDays
            mtoShippingBusinessDays
            shippingText
            staticText
            assembledToOrderList {
                sku
                shippingBusinessDays
            }
            plpBannerText
            plpMobileBannerText
            plpFilterButtonText
            useStaticText
            bulkShippingText
            supportedCountries {
                name
                code
            }
        }   
    }
`;

export default shipsInTime;

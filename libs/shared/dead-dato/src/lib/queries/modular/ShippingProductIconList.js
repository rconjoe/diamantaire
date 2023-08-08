const ShippingProductIconList = `
... on ModularShippingProductIconListItemRecord {
    id
    _modelApiKey
    shippingBusinessDays
    shippingBusinessDaysCountryMap
    shippingText
    useStaticText
    staticText
    icon {
        url
    }
    cutForYouShippingText
    cutForYouShippingDetails
    cutForYouShippingBusinessDays
    cutForYouShippingBusinessDaysCountryMap
    cutForYouReturnPolicyIcon {
        url
    }
    cutForYouReturnPolicyTitle
    cutForYouReturnPolicyDetails
}
`;

export default ShippingProductIconList;

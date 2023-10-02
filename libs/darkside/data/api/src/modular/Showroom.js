const Showroom = `
  ... on ModularShowroomBlockRecord {
    id
    _modelApiKey
    data {
      title
      address
      slug
      appointmentCtaCopy
      appointmentCtaLink
      appointmentMarkdown
      detailCtaCopy
      detailCtaLink
      directionsCtaCopy
      directionsCtaLink
      email
      hoursOfOperation
      phone
      phoneLabel
      emailLabel
      contactLabel
      hoursOfOperationLabel
      locationLabel
      emailText
      emailCtaStyle
    }
    image {
      url
    }
  }
`;

export default Showroom;

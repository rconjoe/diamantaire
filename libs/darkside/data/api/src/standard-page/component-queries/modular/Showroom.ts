const Showroom = `
  ... on ModularShowroomBlockRecord {
    id
    _modelApiKey
    data {
      title
      address
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
      responsiveImage(imgixParams: {w: 600, q: 40, auto: format, fit: crop, crop: focalpoint }) {
        ...responsiveImageFragment
      }
    }
  }
`;

export default Showroom;

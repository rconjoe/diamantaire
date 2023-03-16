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
      slug
      directionsImage {
        url
        alt
        responsiveImage (imgixParams: { w: 700, q: 40, auto: format }){
            src
            alt
            aspectRatio
            base64
            bgColor
            height
            sizes
            title
            width
        }
      }
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

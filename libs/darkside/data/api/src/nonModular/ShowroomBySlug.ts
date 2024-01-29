const ShowroomBySlug = `
  query showroomBySlug($slug: String! $locale: SiteLocale) {
    showroom(locale: $locale filter: {slug: {eq: $slug}}) {
      title
      slug
      address
      hoursOfOperation
      phone
      email
      directionsCtaCopy
      directionsCtaLink
      directionsImage {
        url
        alt
        responsiveImage (imgixParams: { w: 338, q: 40, auto: format }, sizes: "(min-width: 769px) 600"){
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
      appointmentCtaCopy
      appointmentCtaLink
      appointmentMarkdown
      detailCtaCopy
      detailCtaLink
      locationLabel
      phoneLabel
      emailLabel
      hoursOfOperationLabel
      servicesLabel
      emailText
      emailCtaStyle
      images {
        url
        alt
        responsiveImage (imgixParams: { w: 338, q: 40, auto: format }, sizes: "(min-width: 769px) 600){
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
      services
    }
  }
`;

export default ShowroomBySlug;

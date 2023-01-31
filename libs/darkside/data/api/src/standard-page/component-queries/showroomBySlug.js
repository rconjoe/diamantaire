const showroomBySlug = `
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
        responsiveImage (imgixParams: { w: 700, q: 40, auto: format }){
            src
            alt
            aspectRatio
            base64
            bgColor
            height
            sizes
            srcSet
            title
            webpSrcSet
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
          responsiveImage (imgixParams: { w: 700, q: 40, auto: format }){
              src
              alt
              aspectRatio
              base64
              bgColor
              height
              sizes
              srcSet
              title
              webpSrcSet
              width
          }
      }
      services
    }
  }
`;

export default showroomBySlug;

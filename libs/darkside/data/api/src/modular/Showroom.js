import { ButtonFragment } from '../fragments';

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
      darksideButtons {
        ${ButtonFragment}
      }
    }
    image {
      url
    }
  }
`;

export default Showroom;

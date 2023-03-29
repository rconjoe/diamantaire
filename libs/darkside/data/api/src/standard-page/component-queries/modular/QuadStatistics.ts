const QuadStatistics = `
  ... on ModularQuadStatisticsBlockRecord {
    id 
    _modelApiKey
    title1
    title2
    statsTitle1
    image1 {
      alt
      url
      responsiveImage (imgixParams: {w: 375, q: 35, auto: format, fit: crop, crop: focalpoint }){
        ...responsiveImageFragment
      }
    }
    copy1
    statsTitle2
    image2 {
      alt
      url
      responsiveImage (imgixParams: {w: 375, q: 35, auto: format, fit: crop, crop: focalpoint }){
        ...responsiveImageFragment
      }
    }
    copy2
    statsTitle3
    image3 {
      alt
      url
      responsiveImage (imgixParams: {w: 375, q: 35, auto: format, fit: crop, crop: focalpoint }){
        ...responsiveImageFragment
      }
    }
    copy3
    statsTitle4
    image4 {
      alt
      url
      responsiveImage (imgixParams: {w: 375, q: 35, auto: format, fit: crop, crop: focalpoint }){
        ...responsiveImageFragment
      }
    }
    copy4
  }
`;

export default QuadStatistics;

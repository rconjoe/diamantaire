const SingleVideo = `
  ... on ModularSingleVideoBlockRecord {
    _modelApiKey
    id
    shouldAutoplay
    showControls
    shouldLoop
    additionalClass
    title
    titleFont
    titleStyle
    titleColor {
      hex
    }
    video {
      video {
        streamingUrl
      }
      alt
    }
    mobileVideo {
      video {
        streamingUrl
      }
      alt
    }
  }
`;

export default SingleVideo;

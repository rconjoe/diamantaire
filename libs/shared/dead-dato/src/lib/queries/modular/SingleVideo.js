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
        thumbnailUrl
      }
      alt
    }
    mobileVideo {
      video {
        streamingUrl
        thumbnailUrl
      }
      alt
    }
  }
`;

export default SingleVideo;

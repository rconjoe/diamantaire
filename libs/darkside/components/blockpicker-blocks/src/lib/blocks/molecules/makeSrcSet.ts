export default function makeSrcSet({ imageUrl, srcSet1XSizes, additionalDPIs, zoom }) {
  const srcSetSizesWithDPI = addDPIs({ srcSet1XSizes, additionalDPIs });

  return makeSrcSetUrlString({ srcSetSizesWithDPI, imageUrl, zoom });
}

function addDPIs({ srcSet1XSizes, additionalDPIs }) {
  const srcSetWithDPI = [];

  srcSet1XSizes.forEach((width) => {
    const DPIWidths = makeDPIWidths({ width, additionalDPIs });

    srcSetWithDPI.push(...DPIWidths);
  });

  return srcSet1XSizes.concat(srcSetWithDPI);
}

function makeDPIWidths({ width, additionalDPIs }) {
  return additionalDPIs.map((dpi) => {
    return width * dpi;
  });
}

function makeSrcSetUrlString({ srcSetSizesWithDPI, imageUrl, zoom }) {
  const zoomURL = zoom ? `&fit=crop&crop=focalpoint&fp-z=${zoom}` : '';

  return (
    srcSetSizesWithDPI
      // sort hi to lo
      .sort((a, b) => b - a)
      .map((width) => `${imageUrl}${zoomURL}&w=${width} ${width}w`)
      .join('\n,')
  );
}

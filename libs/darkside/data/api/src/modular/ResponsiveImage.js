export const responsiveImage = (w, h) => `
url
alt
responsiveImage(imgixParams: {w: ${w ? `${w}` : `500`},${
  h ? ` h: ${h},` : ``
} q: 60, auto: [format, compress], fit: crop, crop: focalpoint }) {
  title
  height
  width
  src
  base64
}
`;

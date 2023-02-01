const getBlockPictureAlt = ({
  image = {},
  desktopImage = {},
  mobileImage = {},
  title = '',
}) => {
  const { alt: imageAlt } = image || {};
  const { alt: desktopAlt } = desktopImage || {};
  const { alt: mobileAlt } = mobileImage || {};

  return imageAlt || desktopAlt || mobileAlt || title;
};

export default getBlockPictureAlt;

const canUseWebP = () => {
  const elem = document?.createElement('canvas');

  if (elem.getContext && elem.getContext('2d')) {
    return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }

  return false;
};

export default canUseWebP;

export { canUseWebP };

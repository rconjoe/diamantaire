const sanitizeDiamondLotId = diamondLotId => {
  if (Array.isArray(diamondLotId)) {
    return diamondLotId;
  } else if (diamondLotId) {
    return diamondLotId.split(',');
  }

  return [];
};

export default sanitizeDiamondLotId;

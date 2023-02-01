const getProductFirstAssetUrl = assetStack =>
  assetStack && assetStack.length ? assetStack[0]?.url : '';

export default getProductFirstAssetUrl;

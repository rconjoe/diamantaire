export function getActiveGiftWithPurchaseProduct({
  isDataFetchedAndPopulated,
  fetchedData,
}) {
  if (!isDataFetchedAndPopulated) {
    return null;
  }

  const isDatoSwitchTurnedOff = !fetchedData.cmsData.isFreeGiftEnabled;

  if (isDatoSwitchTurnedOff) {
    return null;
  }

  const activeGiftProduct = fetchedData.giftProductOptions.find(
    (option) => option.isActive
  );

  if (!activeGiftProduct) {
    return null;
  }

  return activeGiftProduct;
}

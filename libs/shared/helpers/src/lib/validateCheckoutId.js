function validateCheckoutId(resultCheckoutId, existingCheckoutId) {
  if (resultCheckoutId !== existingCheckoutId) {
    return resultCheckoutId;
  }

  return existingCheckoutId;
}

export default validateCheckoutId;

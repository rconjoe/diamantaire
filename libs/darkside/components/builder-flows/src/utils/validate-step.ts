// This is the logic for identifying where the user is in the flow

export function validateStep(step, type, collectionSlug, productSlug, lotId) {
  // If there is no step, guess the step based on the url params
  if (!step && step !== 0) {
    if (type === 'setting-to-diamond') {
      if (collectionSlug && productSlug && !lotId) {
        return 1;
      } else if (lotId && collectionSlug && productSlug) {
        return 2;
      } else {
        return step;
      }
    } else if (type === 'diamond-to-setting') {
      if (lotId && !collectionSlug && !productSlug) {
        return 1;
      } else if (lotId && collectionSlug && productSlug) {
        return 3;
      } else if (!lotId) {
        return 0;
      } else {
        return step;
      }
    }
  } else if (step || step === 0) {
    // if there is a step provided, confirm that it is valid based on the params

    if (type === 'setting-to-diamond') {
      if (step === 1 && collectionSlug && productSlug && !lotId) {
        return 1;
      } else if (step === 2 && lotId && collectionSlug && productSlug) {
        return 2;
      } else {
        return step;
      }
    } else if (type === 'diamond-to-setting') {
      if (step === 1 && lotId && !collectionSlug && !productSlug) {
        return 1;
      } else if (step === 2 && lotId && collectionSlug && productSlug) {
        return 2;
      } else if (step === 3 && lotId && collectionSlug && productSlug) {
        return 3;
      } else if (step === 0 && !lotId) {
        return 0;
      } else {
        return step;
      }
    }
  }
}

// http://localhost:4200/customize?type=diamond-to-setting&lotId=F596912&step=2&collectionSlug=signature-prong&productSlug=round-brilliant-yellow-gold-16169165881410

import getApplicableVatRates from './getApplicableVatRates';

describe('getApplicableVatRates helper', () => {
  const vatRates = { DE: 1.25, NO: 1.23, GB: 1.2 };

  it('reduces a vat rate map to only the ones enabled', () => {
    // We do not collect Norway VAT
    expect(getApplicableVatRates(vatRates)).toEqual({ DE: 1.25, GB: 1.2 });
  });

  it('returns an empty object if not provided vatRates', () => {
    expect(getApplicableVatRates(undefined)).toEqual({});
  });
});

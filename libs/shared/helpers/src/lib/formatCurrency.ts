import { DEFAULT_LOCALE } from '@diamantaire/shared/constants';

type CurrencyFormatterProps = {
  locale?: string;
  amount: number;
};

export function formatCurrency({ locale = DEFAULT_LOCALE, amount }: CurrencyFormatterProps) {
  const options = {
    style: 'currency',
    currency: 'USD',
  };

  return new Intl.NumberFormat(locale, options).format(amount).replace('.00', '');
}

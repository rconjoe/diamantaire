import { useTranslations } from '@diamantaire/darkside/data/hooks';
import { getFormattedPrice } from '@diamantaire/shared/constants';
import { OptionItemProps } from '@diamantaire/shared/types';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';

import OptionSelector from './OptionSelector';

const PairSelectorStyles = styled.div``;

// Earrings - soldAsDouble logic
const PairSelector = ({
  selectedPair,
  setSelectedPair,
  isSoldAsDouble,
  isSoldAsPairOnly,
  variantPrice,
  setShouldDoublePrice,
  selectedConfiguration,
}) => {
  const { locale } = useRouter();
  const { _t } = useTranslations(locale);

  // Pairs require a dollar being added when they are not in the US

  const pairSelector = useMemo(() => {
    if (isSoldAsPairOnly) {
      return [
        {
          id: 'pair',
          value:
            `${_t('Pair')} ${selectedConfiguration.caratWeight !== 'other' && '<span class="em-dash"></span>'}` +
            getFormattedPrice(variantPrice * 2, locale),
          valueLabel: 'Pair',
          isSelected: selectedPair === 'pair',
        },
      ];
    } else {
      return [
        {
          id: 'single',
          value: `${_t('Single')} ${
            selectedConfiguration.caratWeight !== 'other'
              ? '<span class="em-dash"></span>' + getFormattedPrice(variantPrice, locale)
              : ''
          } `,
          valueLabel: 'Single',
        },
        {
          id: 'pair',
          value: `${_t('Pair')} ${
            selectedConfiguration.caratWeight !== 'other'
              ? '<span class="em-dash"></span> ' + getFormattedPrice(variantPrice * 2, locale)
              : ''
          } `,
          valueLabel: 'Pair',
        },
      ];
    }
  }, [isSoldAsPairOnly, selectedConfiguration]);

  const handlePairChange = useCallback(
    (option: OptionItemProps) => {
      setSelectedPair(option.id as 'pair' | 'single');

      if (option.id === 'pair') {
        setShouldDoublePrice(true);
      } else {
        setShouldDoublePrice(false);
      }
    },
    [isSoldAsDouble],
  );

  useEffect(() => {
    if (isSoldAsDouble) {
      setSelectedPair('pair');
      setShouldDoublePrice(true);
    }
  }, [isSoldAsPairOnly]);

  return (
    <PairSelectorStyles>
      <OptionSelector
        optionType={'soldAsDouble'}
        label={'soldAsDouble'}
        options={pairSelector}
        selectedOptionValue={selectedPair}
        onChange={handlePairChange}
        hideSelectorLabel={true}
        selectedConfiguration={selectedConfiguration}
      />
    </PairSelectorStyles>
  );
};

export default PairSelector;

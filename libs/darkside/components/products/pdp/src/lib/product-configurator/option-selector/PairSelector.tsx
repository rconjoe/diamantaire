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
}) => {
  const { locale } = useRouter();
  const pairSelector = useMemo(() => {
    if (isSoldAsPairOnly) {
      return [
        {
          id: 'pair',
          value: 'Pair - ' + getFormattedPrice(variantPrice, locale),
          valueLabel: 'Pair',
          isSelected: selectedPair === 'pair',
        },
      ];
    } else {
      return [
        {
          id: 'single',
          value: 'Single - ' + getFormattedPrice(variantPrice / 2, locale),
          valueLabel: 'Single',
        },
        {
          id: 'pair',
          value: 'Pair - ' + getFormattedPrice(variantPrice, locale),
          valueLabel: 'Pair',
        },
      ];
    }
  }, [isSoldAsPairOnly]);

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
      />
    </PairSelectorStyles>
  );
};

export default PairSelector;

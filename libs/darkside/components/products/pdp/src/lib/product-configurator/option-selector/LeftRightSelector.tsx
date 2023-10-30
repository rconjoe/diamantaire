import { OptionItemProps } from '@diamantaire/shared/types';
import { useCallback, useMemo } from 'react';

import OptionSelector from './OptionSelector';

const LeftRightSelector = ({ selectedEarringOrientation, setSelectedEarringOrientation, setShouldDoublePrice }) => {
  const pairSelector = useMemo(() => {
    return [
      {
        id: 'left',
        value: 'Left',
        valueLabel: 'Left',
      },
      {
        id: 'right',
        value: 'Right',
        valueLabel: 'Right',
      },
      {
        id: 'pair',
        value: 'Pair',
        valueLabel: 'Pair',
      },
    ];
  }, []);

  const handleOrientationChange = useCallback((option: OptionItemProps) => {
    setSelectedEarringOrientation(option.id as 'left' | 'right' | 'pair');
    if (option.id === 'pair') {
      setShouldDoublePrice(true);
    } else {
      setShouldDoublePrice(false);
    }
  }, []);

  return (
    <OptionSelector
      optionType={'soldAsLeftRight'}
      label={'soldAsLeftRight'}
      options={pairSelector}
      selectedOptionValue={selectedEarringOrientation}
      onChange={handleOrientationChange}
      hideSelectorLabel={true}
    />
  );
};

export default LeftRightSelector;

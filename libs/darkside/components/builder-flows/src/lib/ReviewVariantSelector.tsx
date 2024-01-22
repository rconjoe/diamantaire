import { UIString } from '@diamantaire/darkside/components/common-ui';
import { OptionSelector } from '@diamantaire/darkside/components/products/pdp';
import { humanNamesMapperType, useTranslations } from '@diamantaire/darkside/data/hooks';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState } from 'react';

const ReviewVariantSelector = ({
  selector,
  configurations,
  selectedConfiguration,
  handleOptionChange,
  handleBuilderFlowVariantChange,
}) => {
  const [isOptionSelectorOpen, setIsOptionSelectorOpen] = useState(false);
  const { locale } = useRouter();
  const { _t } = useTranslations(locale, [
    humanNamesMapperType.BAND_WIDTH_LABEL_HUMAN_NAMES,
    humanNamesMapperType.METALS_IN_HUMAN_NAMES_WITH_DEFAULT_GOLD_PURITIES,
    humanNamesMapperType.BAND_ACCENT_CATEGORY_SHORT_HUMAN_NAMES,
    humanNamesMapperType.OPTION_NAMES,
    humanNamesMapperType.HIDDEN_HALO_HUMAN_NAMES,
    humanNamesMapperType.DIAMOND_SHAPES,
    humanNamesMapperType.CARAT_WEIGHT_HUMAN_NAMES,
  ]);

  return (
    <li>
      <span className="label">{_t(selector)}:</span>
      <span className="value">
        {_t(selectedConfiguration[selector])}
        {selector === 'sideStoneCarat' ? 'ct' : ''}
      </span>
      <span className="toggle">
        <button onClick={() => setIsOptionSelectorOpen(!isOptionSelectorOpen)}>
          {' '}
          <UIString>Modify</UIString>{' '}
        </button>
      </span>
      <AnimatePresence>
        {isOptionSelectorOpen && (
          <div className="acc-container">
            <OptionSelector
              optionType={selector}
              productType={'Engagement Ring'}
              label={selector}
              options={configurations[selector]}
              selectedOptionValue={selectedConfiguration[selector]}
              onChange={(option) => {
                // console.log('option', val);
                handleOptionChange(selector, option);
                handleBuilderFlowVariantChange(option, selector);
                setIsOptionSelectorOpen(false);
              }}
              renderItemAsLink={false}
              hideSelectorLabel={true}
              selectedConfiguration={selectedConfiguration}
              areDiamondShapesHorizontal={selectedConfiguration?.diamondOrientation === 'horizontal'}
            />
          </div>
        )}
      </AnimatePresence>
    </li>
  );
};

export default ReviewVariantSelector;

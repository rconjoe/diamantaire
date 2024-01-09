import { OptionSelector } from '@diamantaire/darkside/components/products/pdp';
import { useTranslations } from '@diamantaire/darkside/data/hooks';
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
  const { _t } = useTranslations(locale);

  return (
    <li>
      <span className="label">{_t(selector)}:</span>
      <span className="value">{_t(selectedConfiguration[selector])}</span>
      <span className="toggle">
        <button onClick={() => setIsOptionSelectorOpen(!isOptionSelectorOpen)}>Modify</button>
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

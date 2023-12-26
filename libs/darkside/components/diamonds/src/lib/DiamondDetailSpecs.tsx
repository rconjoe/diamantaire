import { useDiamondPdpData, useDiamondsData } from '@diamantaire/darkside/data/hooks';
import { DEFAULT_LOCALE } from '@diamantaire/shared/constants';
import { useCallback } from 'react';

import StyledDiamondSpecs from './DiamondDetailSpecs.style';

export interface DiamondSpecsProps {
  locale?: string;
  handle?: string;
}

const DiamondDetailSpecs = ({ locale = DEFAULT_LOCALE, handle }: { locale?: string; handle?: string }) => {
  const {
    data: {
      diamondProduct: {
        specLabels: { labels = [] } = {},
        specsHeadline,
        originLabel,
        cutMapAbridged,
        girdleAbridged,
        fluorescenceAbridged,
        polishAndSymmetryAbridged,
      } = {},
    } = {},
  } = useDiamondPdpData(locale);

  const {
    data: {
      diamond: {
        shape,
        width_mm,
        depth_mm,
        length_mm,
        table_size,
        depth_pct,
        symmetry,
        polish,
        girdle,
        cut_grade,
        fluorescence,
      } = {},
    } = {},
  } = useDiamondsData({ handle, withAdditionalInfo: true });

  const pickSpecValue = useCallback(
    (name) => {
      const value = name && name.toLowerCase();

      switch (true) {
        case value === 'origin':
          return originLabel;
        case value === 'shape':
          return shape;
        case value === 'measurements':
          return `${length_mm}mm x ${width_mm}mm x ${depth_mm}mm`;
        case value === 'table':
          return `${table_size}%`;
        case value === 'depth':
          return `${depth_pct}%`;
        case value === 'symmetry':
          return getValue(polishAndSymmetryAbridged, symmetry) || symmetry;
        case value === 'polish':
          return getValue(polishAndSymmetryAbridged, polish) || polish;
        case value === 'girdle':
          return getValue(girdleAbridged, girdle) || girdle;
        case value === 'cutlet':
          return getValue(cutMapAbridged, cut_grade) || cut_grade;
        case value === 'fluorescence':
          return getValue(fluorescenceAbridged, fluorescence) || fluorescence;
      }
    },
    [
      originLabel,
      shape,
      length_mm,
      width_mm,
      depth_mm,
      table_size,
      depth_pct,
      polishAndSymmetryAbridged,
      symmetry,
      polish,
      girdleAbridged,
      girdle,
      cutMapAbridged,
      cut_grade,
      fluorescenceAbridged,
      fluorescence,
    ],
  );

  const getIsValidSpec = useCallback(
    (name: string) => {
      const value = name && name.toLowerCase();

      switch (true) {
        case value === 'origin':
          return Boolean(originLabel);
        case value === 'shape':
          return Boolean(shape);
        case value === 'measurements':
          return Boolean(width_mm);
        case value === 'table':
          return Boolean(table_size);
        case value === 'depth':
          return Boolean(depth_pct);
        case value === 'symmetry':
          return Boolean(getValue(polishAndSymmetryAbridged, symmetry));
        case value === 'polish':
          return Boolean(getValue(polishAndSymmetryAbridged, polish));
        case value === 'girdle':
          return Boolean(getValue(girdleAbridged, girdle));
        case value === 'cutlet':
          return Boolean(getValue(cutMapAbridged, cut_grade));
        case value === 'fluorescence':
          return Boolean(getValue(fluorescenceAbridged, fluorescence));
      }
    },
    [
      originLabel,
      shape,
      width_mm,
      table_size,
      depth_pct,
      polishAndSymmetryAbridged,
      polish,
      girdleAbridged,
      girdle,
      cutMapAbridged,
      cut_grade,
      fluorescenceAbridged,
      fluorescence,
    ],
  );

  return (
    <StyledDiamondSpecs className="diamond-specs">
      <strong className="title">{specsHeadline}</strong>

      <div className="spec-list">
        {labels.map(({ copy, specName }: { copy: string; specName: string }) => {
          if (getIsValidSpec(specName)) {
            return (
              <div key={copy} className="spec-row">
                <div className="spec-label">{copy}: </div>
                <div className="spec-value">{pickSpecValue(specName)}</div>
              </div>
            );
          }
        })}
      </div>
    </StyledDiamondSpecs>
  );
};

export { DiamondDetailSpecs };

export default DiamondDetailSpecs;

function getValue(arr, val) {
  return arr.find((v) => {
    return v.key === val?.toLowerCase() || v.key === val;
  })?.value;
}

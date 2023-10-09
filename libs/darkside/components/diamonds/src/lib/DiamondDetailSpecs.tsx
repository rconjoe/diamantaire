import { useDiamondPdpData, useDiamondsData } from '@diamantaire/darkside/data/hooks';
import { DEFAULT_LOCALE } from '@diamantaire/shared/constants';

import StyledDiamondSpecs from './DiamondDetailSpecs.style';

export interface DiamondSpecsProps {
  locale?: string;
  lotId?: string;
}

const DiamondDetailSpecs = ({ locale = DEFAULT_LOCALE, lotId }: { locale?: string; lotId?: string }) => {
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
  } = useDiamondsData({ lotId });

  const pickSpecValue = (name: string) => {
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
        return polishAndSymmetryAbridged[symmetry?.toLowerCase()] || symmetry;
      case value === 'polish':
        return polishAndSymmetryAbridged[polish?.toLowerCase()] || polish;
      case value === 'girdle':
        return girdleAbridged[girdle?.toLowerCase()] || girdle;
      case value === 'cutlet':
        return cutMapAbridged[cut_grade];
      case value === 'fluorescence':
        return fluorescenceAbridged[fluorescence?.toLowerCase()] || fluorescence;
    }
  };

  const getIsValidSpec = (name: string) => {
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
        return Boolean(polishAndSymmetryAbridged[symmetry?.toLowerCase()] || symmetry);
      case value === 'polish':
        return Boolean(polishAndSymmetryAbridged[polish?.toLowerCase()] || polish);
      case value === 'girdle':
        return Boolean(girdleAbridged[girdle?.toLowerCase()] || girdle);
      case value === 'cutlet':
        return Boolean(cutMapAbridged[cut_grade]);
      case value === 'fluorescence':
        return Boolean(fluorescenceAbridged[fluorescence?.toLowerCase()] || fluorescence);
    }
  };

  return (
    <StyledDiamondSpecs className="diamond-specs">
      <strong className="title">{specsHeadline}</strong>

      <div className="spec-list">
        {labels.map(({ copy }: { copy: string; specName: string }) => {
          if (getIsValidSpec(copy)) {
            return (
              <div key={copy} className="spec-row">
                <div className="spec-label">{copy}: </div>
                <div className="spec-value">{pickSpecValue(copy)}</div>
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

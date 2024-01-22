import { Heading, UIString } from '@diamantaire/darkside/components/common-ui';
import { humanNamesMapperType } from '@diamantaire/darkside/data/hooks';
import { JEWELRY_SUB_CATEGORY_HUMAN_NAMES, RING_STYLES_MAP, ringStylesWithIconMap } from '@diamantaire/shared/constants';
import { diamondIconsMap } from '@diamantaire/shared/icons';
import clsx from 'clsx';

const renderFilterOptionSet = ({ filterType, mapFunction, allFilterTypes, updateFilter, currentFilters, format }) => {
  let title = filterType;

  if (['styles', 'subStyles'].includes(filterType)) {
    title = 'style';
  }

  return (
    <div
      className={clsx(`filter-option-set ${filterType}`, {
        stacked: format === 'stacked',
      })}
    >
      <Heading type="h3" className="h1 secondary">
        <UIString>{title}</UIString>
      </Heading>

      <ul className="list-unstyled flex">
        {allFilterTypes[filterType]?.map((val) => mapFunction({ optionVal: val, updateFilter, filterType, currentFilters }))}
      </ul>
    </div>
  );
};

const renderDiamondType = ({ optionVal: diamondType, updateFilter, currentFilters }) => {
  const Icon = diamondIconsMap[diamondType]?.icon;

  if (diamondType.includes('+')) return null;

  return (
    <li key={`filter-${diamondType}`}>
      <button
        className={clsx('flex align-center', {
          active: currentFilters['diamondType']?.includes(diamondType),
        })}
        onClick={() => updateFilter('diamondType', diamondType)}
      >
        <span className="diamond-icon">
          <Icon />
        </span>
        <span className="diamond-text">
          <UIString types={[humanNamesMapperType.DIAMOND_SHAPES]}>{diamondType}</UIString>
        </span>
      </button>
    </li>
  );
};

const renderMetal = ({ optionVal: metal, updateFilter, currentFilters }) => {
  const filtersToNotShow = ['rose-gold and platinum', 'yellow-gold and platinum'];

  if (filtersToNotShow.includes(metal)) return null;

  return (
    <li key={`filter-${metal}`}>
      <button
        className={clsx('flex align-center', {
          active: currentFilters['metal']?.includes(metal),
        })}
        onClick={() => updateFilter('metal', metal)}
      >
        <span className={clsx('metal-swatch', metal)}></span>
        <span className="metal-text">
          <UIString types={[humanNamesMapperType.METALS_IN_HUMAN_NAMES]}>{metal}</UIString>
        </span>
      </button>
    </li>
  );
};

const renderRingStyles = ({ optionVal: ringStyle, updateFilter, currentFilters }) => {
  const Icon = ringStylesWithIconMap?.[ringStyle]?.icon;

  if (ringStyle.includes('+')) return null;

  return (
    <li key={`filter-${ringStyle}`}>
      <button
        className={clsx('flex align-center', {
          active: currentFilters['style']?.includes(ringStyle),
        })}
        onClick={() => updateFilter('style', ringStyle)}
      >
        <span className="setting-icon">
          <Icon />
        </span>
        <span className="diamond-text">
          <UIString types={[humanNamesMapperType.BAND_WIDTH_HUMAN_NAMES]}>{RING_STYLES_MAP[ringStyle]}</UIString>
        </span>
      </button>
    </li>
  );
};

const renderSubStyles = ({ optionVal: style, updateFilter, currentFilters }) => {
  return (
    <li key={`filter-${style}`}>
      <button
        className={clsx('flex align-center', {
          active: currentFilters['subStyle']?.includes(style),
        })}
        onClick={() => updateFilter('subStyle', style)}
      >
        <span className="subStyle-text">
          <UIString>{JEWELRY_SUB_CATEGORY_HUMAN_NAMES[style] || style}</UIString>
        </span>
      </button>
    </li>
  );
};

type FilterOptionsProps = {
  filterType: string;
  allFilterTypes: { [key: string]: string[] };
  updateFilter: (filterType: string, filterValue: string | { min: number; max: number }) => void;
  currentFilters: { [key: string]: string };
  format?: 'stacked' | 'inline';
};

const PlpFilterOption = ({ filterType, allFilterTypes, updateFilter, currentFilters, format }: FilterOptionsProps) => {
  return (
    <>
      {renderFilterOptionSet({
        filterType: filterType,
        mapFunction:
          filterType === 'subStyles'
            ? renderSubStyles
            : filterType === 'styles'
            ? renderRingStyles
            : filterType === 'diamondType'
            ? renderDiamondType
            : renderMetal,
        allFilterTypes,
        updateFilter,
        currentFilters,
        format,
      })}
    </>
  );
};

export default PlpFilterOption;

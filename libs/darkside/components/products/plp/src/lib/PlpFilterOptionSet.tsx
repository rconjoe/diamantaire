import { Heading, UIString } from '@diamantaire/darkside/components/common-ui';
import { METALS_IN_HUMAN_NAMES } from '@diamantaire/shared/constants';
import { diamondIconsMap } from '@diamantaire/shared/icons';
import clsx from 'clsx';

const renderFilterOptionSet = ({ filterType, mapFunction, allFilterTypes, updateFilter, currentFilters, format }) => {
  return (
    <div
      className={clsx(`filter-option-set ${filterType}`, {
        stacked: format === 'stacked',
      })}
    >
      <Heading type="h3" className="h1 secondary">
        <UIString>{filterType}</UIString>
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
          <UIString>{diamondType}</UIString>
        </span>
      </button>
    </li>
  );
};

const renderMetal = ({ optionVal: metal, updateFilter, currentFilters }) => {
  return (
    <li key={`filter-${metal}`}>
      <button
        className={clsx('flex align-center', {
          active: currentFilters['metal']?.includes(metal),
        })}
        onClick={() => updateFilter('metal', metal)}
      >
        <span className={clsx('metal-swatch', metal)}></span>
        <span className="metal-text">{METALS_IN_HUMAN_NAMES[metal]}</span>
      </button>
    </li>
  );
};

// Need to finish +
// const renderStyles = (ringStyle) => {
//   const Icon = ringStylesWithIconMap?.[ringStyle]?.icon;

//   if (ringStyle.includes('+')) return null;
//   if (!Icon) return <p>icon missing for {ringStyle}</p>;

//   return (
//     <li key={`filter-${ringStyle}`}>
//       <button className="flex align-center" onClick={() => updateFilter('style', ringStyle)}>
//         <span className="setting-icon">
//           <Icon />
//         </span>
//         <span className="diamond-text">{RING_STYLES_MAP[ringStyle]} </span>
//       </button>
//     </li>
//   );
// };

// const renderSubStyles = (style) => {
//   return (
//     <li key={`filter-${style}`}>
//       <button className="flex align-center" onClick={() => updateFilter('subStyle', style)}>
//         <span className="subStyle-text">{JEWELRY_SUB_CATEGORY_HUMAN_NAMES[style] || style} </span>
//       </button>
//     </li>
//   );
// };

const PlpFilterOption = ({ filterType, allFilterTypes, updateFilter, currentFilters, format }) => {
  return (
    <>
      {renderFilterOptionSet({
        filterType: filterType,
        mapFunction: filterType === 'diamondType' ? renderDiamondType : renderMetal,
        allFilterTypes,
        updateFilter,
        currentFilters,
        format,
      })}
    </>
  );
};

export default PlpFilterOption;

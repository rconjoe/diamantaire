import { METALS_IN_HUMAN_NAMES } from '@diamantaire/shared/constants';
import { diamondIconsMap } from '@diamantaire/shared/icons';
import clsx from 'clsx';

const renderFilterOptionSet = ({
  filterType,
  mapFunction,
  allFilterTypes,
  actualFilterValue,
  updateFilter,
  currentFilters,
}) => {
  return (
    <div className={`filter-option-set ${filterType}`}>
      <ul className="list-unstyled flex">
        {allFilterTypes[filterType]?.map((val) =>
          mapFunction(val, actualFilterValue, updateFilter, filterType, currentFilters),
        )}
      </ul>
    </div>
  );
};

const renderDiamondType = (diamondType, _filterValue, updateFilter, _filterType, currentFilters) => {
  const Icon = diamondIconsMap[diamondType]?.icon;

  if (diamondType.includes('+')) return null;

  return (
    <li key={`filter-${diamondType}`}>
      <button
        className={clsx('flex align-center', {
          active: currentFilters['diamondType'] === diamondType,
        })}
        onClick={() => updateFilter('diamondType', diamondType)}
      >
        <span className="diamond-icon">
          <Icon />
        </span>
      </button>
    </li>
  );
};

const renderMetal = (metal, _filterValue, updateFilter, _filterType, currentFilters) => {
  return (
    <li key={`filter-${metal}`}>
      <button
        className={clsx('flex align-center', {
          active: currentFilters['metal'] === metal,
        })}
        onClick={() => updateFilter('metal', metal)}
      >
        <span className={clsx('metal-swatch', metal)}></span>
        <span className="metal-text">{METALS_IN_HUMAN_NAMES[metal]}</span>
      </button>
    </li>
  );
};

// const renderPriceRange = (price) => {
//   return (
//     <li key={`filter-${price.title}`}>
//       <button
//         className="flex align-center"
//         onClick={() => {
//           setIsCustomPriceRangeOpen(false);
//           updateFilter('price', {
//             min: price.min,
//             max: price.max,
//           });
//         }}
//       >
//         <span className="price-text">{price.title}</span>
//       </button>
//     </li>
//   );
// };

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

const PlpFilterOption = ({ filterType, allFilterTypes, updateFilter, filterValueValue, currentFilters }) => {
  return (
    <>
      {renderFilterOptionSet({
        filterType: filterType,
        mapFunction: filterType === 'diamondType' ? renderDiamondType : renderMetal,
        allFilterTypes,
        updateFilter: updateFilter,
        actualFilterValue: filterValueValue,
        currentFilters,
      })}
    </>
  );
};

export default PlpFilterOption;

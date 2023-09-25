import { Accordion, DarksideButton, Markdown } from '@diamantaire/darkside/components/common-ui';
import { GlobalContext } from '@diamantaire/darkside/context/global-context';
import { UIString, UniLink } from '@diamantaire/darkside/core';
import {
  DiamondCtoDataProps,
  useDiamondCfyData,
  useDiamondTableData,
  useHumanNameMapper,
} from '@diamantaire/darkside/data/hooks';
import { makeCurrency } from '@diamantaire/shared/helpers';
import { DiamondCtoDataTypes } from '@diamantaire/shared/types';
import { useContext } from 'react';

import StyledDiamondCfyAccordion from './DiamondCfyAccordion.style';

const DiamondCfyAccordion = ({
  locale,
  product,
  currencyCode,
  diamondCtoData,
  handleUpgradeClick,
  defaultProduct,
  display,
}: {
  locale?: string;
  currencyCode?: string;
  defaultProduct?: DiamondCtoDataTypes;
  product?: DiamondCtoDataTypes;
  diamondCtoData?: DiamondCtoDataProps;
  handleUpgradeClick?: (type: string) => void;
  display?: string;
}) => {
  const getInfo = (arr, v) => arr.find((x) => x.key === v);
  const { isMobile } = useContext(GlobalContext);
  const { data: humanStrings = {} } = useHumanNameMapper(locale);
  const { data: { diamondTable: DiamondTableData } = {} } = useDiamondTableData(locale);
  const { data: { ctoDiamondTable: DiamondCfyData } = {} } = useDiamondCfyData(locale);
  const { specs } = DiamondTableData || {};
  const { DIAMOND_COLOR_GROUPS = {}, DIAMOND_COLOR_GROUP_TYPES = {} } = humanStrings;

  // COLOR
  const getColorTitle = () => {
    const { color } = product || {};
    const title = getInfo(specs, 'color')?.value;

    return (
      <>
        <strong>{title}:</strong>
        <span>{DIAMOND_COLOR_GROUPS[color]?.value}.</span>
        <strong>{DIAMOND_COLOR_GROUP_TYPES[color]?.value}</strong>
      </>
    );
  };
  const getColorContent = () => {
    const { color } = product || {};
    const { colorDetails, colorNearcolorlessDetails } = DiamondCfyData || {};
    const desc = color === 'NearColorless' ? colorNearcolorlessDetails : colorDetails;
    const upgrade = diamondCtoData?.diamondColorUpgrade || null;
    const upgradeLabel = DIAMOND_COLOR_GROUPS[upgrade?.color]?.value;
    const isAnUpgrade = () => {
      if (upgrade && defaultProduct) {
        return upgrade?.price > defaultProduct.price;
      }
    };
    const getPrice = () => {
      if (upgrade?.priceUpgrade) {
        return makeCurrency(upgrade.priceUpgrade, locale, currencyCode);
      }
    };
    const upgradePrice = (isAnUpgrade() ? '+' : '') + getPrice();

    return (
      <div className="description">
        <Markdown withStyles={false}>{desc}</Markdown>

        {upgrade && (
          <div className="upgrade">
            <form>
              <input
                type="checkbox"
                checked={display === 'diamondColorUpgrade'}
                onChange={() => handleUpgradeClick('diamondColorUpgrade')}
              />
              <div className="label">{upgradeLabel}</div>
              <div className="price">{upgradePrice}</div>
            </form>
            <div className="link">
              <UniLink route="/journal/post/diamond-color">
                <DarksideButton type="underline" colorTheme="teal">
                  <UIString>Learn More</UIString>
                </DarksideButton>
              </UniLink>
            </div>
          </div>
        )}
      </div>
    );
  };

  // CLARITY
  const getClarityTitle = () => {
    const { clarity } = product || {};
    const { clarityMapAbridged } = DiamondTableData || {};
    const label = getInfo(clarityMapAbridged, clarity)?.value || '';
    const title = getInfo(specs, 'clarity')?.value;

    return (
      <>
        <strong>{title}:</strong>
        <span>{label}</span>
        <strong>{clarity}</strong>
      </>
    );
  };
  const getClarityContent = () => {
    const { clarityDetails } = DiamondCfyData || {};

    return (
      <div className="description">
        <Markdown withStyles={false}>{clarityDetails}</Markdown>
      </div>
    );
  };

  // CUT
  const getCutTitle = () => {
    const { cut } = product || {};
    const { cutMapAbridged } = DiamondTableData || {};
    const label = getInfo(cutMapAbridged, cut)?.value || '';
    const title = getInfo(specs, 'cut')?.value;

    return (
      <>
        <strong>{title}</strong>
        <span>{label}</span>
        <strong>{cut}</strong>
      </>
    );
  };
  const getCutContent = () => {
    const { cutDetails } = DiamondCfyData || {};
    const upgrade = diamondCtoData?.diamondCutUpgrade || null;
    const upgradeLabel = upgrade?.cut || '';
    const isAnUpgrade = () => {
      if (upgrade && defaultProduct) {
        return upgrade?.price > defaultProduct.price;
      }
    };
    const getPrice = () => {
      if (upgrade?.priceUpgrade) {
        return makeCurrency(upgrade.priceUpgrade, locale, currencyCode);
      }
    };
    const upgradePrice = (isAnUpgrade() ? '+' : '') + getPrice();

    return (
      <div className="description">
        <Markdown withStyles={false}>{cutDetails}</Markdown>

        {upgrade && (
          <div className="upgrade">
            <form>
              <input
                type="checkbox"
                checked={display === 'diamondCutUpgrade'}
                onChange={() => handleUpgradeClick('diamondCutUpgrade')}
              />
              <div className="label">{upgradeLabel}</div>
              <div className="price">{upgradePrice}</div>
            </form>
            <div className="link">
              <UniLink route="/journal/post/diamond-cut">
                <DarksideButton type="underline" colorTheme="teal">
                  <UIString>Learn More</UIString>
                </DarksideButton>
              </UniLink>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ACCORDION
  const accordionContent = [
    {
      type: 'color',
      title: getColorTitle(),
      children: getColorContent(),
      className: 'color',
    },
    {
      type: 'clarity',
      title: getClarityTitle(),
      children: getClarityContent(),
      className: 'clarity',
    },
    {
      type: 'cut',
      title: getCutTitle(),
      children: getCutContent(),
      className: 'cut',
    },
  ];

  const getActiveDefault = () => {
    let activeDefault = null;

    const upgradeColor = diamondCtoData?.diamondColorUpgrade || null;

    const upgradeCut = diamondCtoData?.diamondCutUpgrade || null;

    const isAnUpgrade = (upgrade) => {
      if (upgrade && product) {
        return upgrade?.price > product.price;
      }
    };

    if (upgradeColor) {
      const index = accordionContent.findIndex((v) => v.type === 'color');

      if (isAnUpgrade(upgradeColor)) {
        activeDefault = index;
      }
    }

    if (upgradeCut) {
      const index = accordionContent.findIndex((v) => v.type === 'cut');

      if (isAnUpgrade(upgradeCut)) {
        activeDefault = index;
      }
    }

    return activeDefault;
  };

  return (
    <StyledDiamondCfyAccordion>
      <Accordion rows={accordionContent} activeDefault={getActiveDefault()} isDiamondDetail={true} />
    </StyledDiamondCfyAccordion>
  );
};

export { DiamondCfyAccordion };

export default DiamondCfyAccordion;

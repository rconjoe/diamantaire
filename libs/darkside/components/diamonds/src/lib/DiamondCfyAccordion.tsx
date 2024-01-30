import { Accordion, DarksideButton, Markdown, UIString, UniLink } from '@diamantaire/darkside/components/common-ui';
import {
  DiamondCtoDataProps,
  useDiamondCfyData,
  useDiamondTableData,
  useHumanNameMapper,
} from '@diamantaire/darkside/data/hooks';
import { getFormattedPrice } from '@diamantaire/shared/constants';
import { DiamondCtoDataTypes } from '@diamantaire/shared/types';

import StyledDiamondCfyAccordion from './DiamondCfyAccordion.style';

const DiamondCfyAccordion = ({
  locale,
  product,
  diamondCtoData,
  handleUpgradeClick,
  defaultProduct,
  display,
}: {
  locale?: string;
  defaultProduct?: DiamondCtoDataTypes;
  product?: DiamondCtoDataTypes;
  diamondCtoData?: DiamondCtoDataProps;
  handleUpgradeClick?: (type: string) => void;
  display?: string;
}) => {
  const getInfo = (arr, v) => arr.find((x) => x.key === v);
  const { data: humanStrings = {} } = useHumanNameMapper(locale);
  const { data: { diamondTable: DiamondTableData } = {} } = useDiamondTableData(locale);
  const { data: { ctoDiamondTable: DiamondCfyData } = {} } = useDiamondCfyData(locale);
  const { specs } = DiamondTableData || {};

  // COLOR
  const { DIAMOND_COLOR_GROUPS = {}, DIAMOND_COLOR_GROUP_TYPES = {} } = humanStrings;
  const getColorTitle = () => {
    const { color } = product || {};
    const title = getInfo(specs, 'color')?.value;

    return (
      <>
        <strong className="label">{title}:</strong>
        <div className="value">
          <span>{DIAMOND_COLOR_GROUPS[color]?.value}.</span> <strong>{DIAMOND_COLOR_GROUP_TYPES[color]?.value}</strong>
        </div>
      </>
    );
  };
  const getColorContent = () => {
    const title = getInfo(specs, 'color')?.value;
    let upgradeLabel, upgradePrice, upgradePriceHuman, upgradePriceSymbol;
    const { color } = product || {};
    const { colorDetails, colorNearcolorlessDetails, colorLearnMoreLink } = DiamondCfyData || {};
    const desc = color === 'NearColorless' ? colorNearcolorlessDetails : colorDetails;
    const upgrade = diamondCtoData?.diamondColorUpgrade;

    if (product && upgrade) {
      upgradeLabel = DIAMOND_COLOR_GROUPS[upgrade.color]?.value || '';

      upgradeLabel += ` (${DIAMOND_COLOR_GROUP_TYPES[upgrade.color]?.value})`;

      upgradePrice = Math.abs(upgrade.price - defaultProduct.price);

      upgradePriceSymbol = upgrade.price > defaultProduct.price ? '+' : '-';

      upgradePriceHuman = (
        <>
          <i>{upgradePriceSymbol}</i>
          <span>{getFormattedPrice(upgradePrice, locale)}</span>
        </>
      );
    }

    return (
      <div className="description">
        <Markdown withStyles={false} imageConfig={{ w: 350, h: 126, alt: title }}>
          {desc}
        </Markdown>

        {upgrade && (
          <div className="upgrade">
            <form>
              <input
                type="checkbox"
                checked={
                  display === 'diamondColorUpgrade' ||
                  display === 'diamondCutAndColorUpgrade' ||
                  display === 'diamondColorAndClarityUpgrade' ||
                  display === 'diamondCutAndColorAndClarityUpgrade'
                }
                onChange={() => handleUpgradeClick('color')}
              />
              <div className="label">{upgradeLabel}</div>
              <div className="price">{upgradePriceHuman}</div>
            </form>
            <div className="link">
              <UniLink route={colorLearnMoreLink}>
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
  const { clarityMapAbridged } = DiamondTableData || {};
  const clarityObjAbridged = (Object.values(clarityMapAbridged) as { key: string; value: string }[]).reduce((a, v) => {
    return { ...a, [v.key]: v.value };
  }, {});
  const clarityLabelMap = {
    'VS+': clarityObjAbridged['VS1']?.replace('.', '+') || '',
    'VVS+': clarityObjAbridged['VVS2'] || '',
  };
  const getClarityTitle = () => {
    const { clarity } = product || {};
    const label = clarityLabelMap[clarity] ? clarityLabelMap[clarity] : getInfo(specs, clarity)?.value;
    const title = getInfo(specs, 'clarity')?.value;

    return (
      <>
        <strong className="label">{title}:</strong>
        <div className="value">
          <span>{label}</span>{' '}
          <strong>
            <UIString>{clarity}</UIString>
          </strong>
        </div>
      </>
    );
  };
  const getClarityContent = () => {
    let upgradeLabel, upgradePrice, upgradePriceHuman, upgradePriceSymbol;
    const { clarity, carat } = product || {};
    const { clarityDetails, clarityDetailsVvsLg, clarityDetailsVvsSm, clarityLearnMoreLink } = DiamondCfyData || {};
    const clarityContent = clarity === 'VVS+' ? (carat > 4 ? clarityDetailsVvsLg : clarityDetailsVvsSm) : clarityDetails;
    const { diamondClarityUpgrade: upgrade } = diamondCtoData || {};

    if (product && upgrade) {
      upgradeLabel = clarityLabelMap[upgrade.clarity]
        ? clarityLabelMap[upgrade.clarity]
        : getInfo(specs, upgrade.clarity)?.value;
      upgradePrice = Math.abs(upgrade.price - defaultProduct.price);
      upgradePriceSymbol = upgrade.price > defaultProduct.price ? '+' : '-';
      upgradePriceHuman = (
        <>
          <i>{upgradePriceSymbol}</i>
          <span>{getFormattedPrice(upgradePrice, locale)}</span>
        </>
      );
    }

    return (
      <div className="description">
        <Markdown withStyles={false}>{clarityContent}</Markdown>

        {upgrade && (
          <div className="upgrade">
            <form>
              <input
                type="checkbox"
                checked={
                  display === 'diamondClarityUpgrade' ||
                  display === 'diamondCutAndClarityUpgrade' ||
                  display === 'diamondColorAndClarityUpgrade' ||
                  display === 'diamondCutAndColorAndClarityUpgrade'
                }
                onChange={() => handleUpgradeClick('clarity')}
              />
              <div className="label">{upgradeLabel}</div>
              <div className="price">{upgradePriceHuman}</div>
            </form>
            <div className="link">
              <UniLink route={clarityLearnMoreLink}>
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

  // CUT
  const getCutTitle = () => {
    const { cut } = product || {};
    const { cutMapAbridged } = DiamondTableData || {};
    const label = getInfo(cutMapAbridged, cut)?.value || '';
    const title = getInfo(specs, 'cut')?.value;

    return (
      <>
        <strong className="label">{title}:</strong>
        <div className="value">
          <span>{label}</span>{' '}
          <strong>
            <UIString>{cut}</UIString>
          </strong>
        </div>
      </>
    );
  };
  const getCutContent = () => {
    let upgradeLabel, upgradePrice, upgradePriceHuman, upgradePriceSymbol;
    const { cutDetails, cutDetailsRoundBrilliant, cutLearnMoreLink } = DiamondCfyData || {};
    const upgrade = diamondCtoData?.diamondCutUpgrade;

    if (product && upgrade) {
      upgradeLabel = upgrade.cut || '';
      upgradePrice = Math.abs(upgrade.price - defaultProduct.price);
      upgradePriceSymbol = upgrade.price > defaultProduct.price ? '+' : '-';
      upgradePriceHuman = (
        <>
          <i>{upgradePriceSymbol}</i>
          <span>{getFormattedPrice(upgradePrice, locale)}</span>
        </>
      );
    }

    return (
      <div className="description">
        <Markdown withStyles={false}>{cutDetails}</Markdown>
        {product?.diamondType === 'round-brilliant' && cutDetailsRoundBrilliant ? (
          <Markdown withStyles={false}>{cutDetailsRoundBrilliant}</Markdown>
        ) : null}

        {upgrade && (
          <div className="upgrade">
            <form>
              <input
                type="checkbox"
                checked={
                  display === 'diamondCutUpgrade' ||
                  display === 'diamondCutAndColorUpgrade' ||
                  display === 'diamondCutAndClarityUpgrade' ||
                  display === 'diamondCutAndColorAndClarityUpgrade'
                }
                onChange={() => handleUpgradeClick('cut')}
              />
              <div className="label">
                <UIString>{upgradeLabel}</UIString>
              </div>
              <div className="price">{upgradePriceHuman}</div>
            </form>
            <div className="link">
              <UniLink route={cutLearnMoreLink}>
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

  // ACTIVE DEFAULT
  const getActiveDefault = () => {
    let activeDefault = -1;

    const data = diamondCtoData || {};

    if (data.diamondColorUpgrade) {
      const index = accordionContent.findIndex((v) => v.type === 'color');

      if (data.diamondColorUpgrade.price > defaultProduct.price) {
        activeDefault = index;
      }
    }

    if (data.diamondCutUpgrade) {
      const index = accordionContent.findIndex((v) => v.type === 'cut');

      if (data.diamondCutUpgrade.price > defaultProduct.price) {
        activeDefault = index;
      }
    }

    if (
      display !== 'diamondColorUpgrade' &&
      display !== 'diamondCutUpgrade' &&
      data.diamondColorUpgrade &&
      data.diamondCutUpgrade
    ) {
      const colorIndex = accordionContent.findIndex((v) => v.type === 'color');
      const cutIndex = accordionContent.findIndex((v) => v.type === 'cut');
      const colorPrice = data.diamondColorUpgrade?.price;
      const cutPrice = data.diamondCutUpgrade?.price;

      if (cutPrice && colorPrice) {
        if (cutPrice > colorPrice && cutPrice > defaultProduct.price) {
          activeDefault = cutIndex;
        }

        if (colorPrice > cutPrice && colorPrice > defaultProduct.price) {
          activeDefault = colorIndex;
        }
      }
    }

    return activeDefault;
  };

  // CONTENT
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

  return (
    <StyledDiamondCfyAccordion>
      <Accordion rows={accordionContent} activeDefault={getActiveDefault()} isDiamondDetail={true} enableScroll={true} />
    </StyledDiamondCfyAccordion>
  );
};

export { DiamondCfyAccordion };

export default DiamondCfyAccordion;

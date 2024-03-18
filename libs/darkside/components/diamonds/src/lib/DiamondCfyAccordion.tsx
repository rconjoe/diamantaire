import { Accordion, DarksideButton, Markdown, UIString, UniLink } from '@diamantaire/darkside/components/common-ui';
import {
  DiamondCtoDataProps,
  useDiamondCfyData,
  useDiamondTableData,
  useHumanNameMapper,
} from '@diamantaire/darkside/data/hooks';
import { getFormattedPrice } from '@diamantaire/shared/constants';
import { capitalizeFirstLetter } from '@diamantaire/shared/helpers';
import { DiamondCtoDataTypes } from '@diamantaire/shared/types';

import StyledDiamondCfyAccordion from './DiamondCfyAccordion.style';

const DiamondCfyAccordion = ({
  locale,
  product,
  diamondCtoData,
  handleUpgradeClick,
  defaultProduct,
  display,
  checkbox,
}: {
  locale?: string;
  defaultProduct?: DiamondCtoDataTypes;
  product?: DiamondCtoDataTypes;
  diamondCtoData?: DiamondCtoDataProps;
  handleUpgradeClick?: (type: string) => void;
  display?: string;
  checkbox: ('cut' | 'color' | 'clarity')[];
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
    const type = 'color';
    const title = getInfo(specs, type)?.value;
    let upgradeLabel, upgradePrice, upgradePriceHuman, upgradePriceSymbol;
    const { color } = product || {};
    const { colorDetails, colorNearcolorlessDetails, colorLearnMoreLink } = DiamondCfyData || {};
    const desc = color === 'NearColorless' ? colorNearcolorlessDetails : colorDetails;
    const checked = checkbox.includes(type);
    const arrayWithUpgrade = [...new Set([...checkbox, type])];
    const arrayWithDowngrade = checkbox.filter((v) => v !== type);
    const upgrade = getProduct(diamondCtoData, arrayWithUpgrade);
    const downgrade = getProduct(diamondCtoData, arrayWithDowngrade);

    if (product && upgrade) {
      upgradeLabel = DIAMOND_COLOR_GROUPS[upgrade.color]?.value || '';
      upgradeLabel += ` (${DIAMOND_COLOR_GROUP_TYPES[upgrade.color]?.value})`;
      upgradePrice = getDiff(upgrade.price, downgrade.price, locale);
      upgradePriceSymbol = upgrade.price > downgrade.price ? '+' : '-';

      upgradePriceHuman = (
        <>
          <i>{upgradePriceSymbol}</i>
          <span>{upgradePrice}</span>
        </>
      );
    }

    return (
      <div className="description">
        <Markdown withStyles={false} imageConfig={{ loading: 'eager', w: 450, h: 175, alt: title }}>
          {desc}
        </Markdown>

        {upgrade && (
          <div className="upgrade">
            <form>
              <input type="checkbox" checked={checked} onChange={() => handleUpgradeClick('color')} />
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
    const type = 'clarity';
    let upgradeLabel, upgradePrice, upgradePriceHuman, upgradePriceSymbol;
    const { clarity, carat } = product || {};
    const { clarityDetails, clarityDetailsVvsLg, clarityDetailsVvsSm, clarityLearnMoreLink } = DiamondCfyData || {};
    const clarityContent = clarity === 'VVS+' ? (carat > 4 ? clarityDetailsVvsLg : clarityDetailsVvsSm) : clarityDetails;
    const checked = checkbox.includes(type);
    const arrayWithUpgrade = [...new Set([...checkbox, type])];
    const arrayWithDowngrade = checkbox.filter((v) => v !== type);
    const upgrade = getProduct(diamondCtoData, arrayWithUpgrade);
    const downgrade = getProduct(diamondCtoData, arrayWithDowngrade);
    const title = getInfo(specs, 'clarity')?.value;

    if (product && upgrade) {
      upgradeLabel = clarityLabelMap[upgrade.clarity]
        ? clarityLabelMap[upgrade.clarity]
        : getInfo(specs, upgrade.clarity)?.value;
      upgradePrice = getDiff(upgrade.price, downgrade.price, locale);
      console.log({ upgradePrice });
      upgradePriceSymbol = upgrade.price > downgrade.price ? '+' : '-';
      upgradePriceHuman = (
        <>
          <i>{upgradePriceSymbol}</i>
          <span>{upgradePrice}</span>
        </>
      );
    }

    return (
      <div className="description">
        <Markdown withStyles={false} imageConfig={{ loading: 'eager', w: 450, h: 175, alt: title }}>
          {clarityContent}
        </Markdown>

        {upgrade && (
          <div className="upgrade">
            <form>
              <input type="checkbox" checked={checked} onChange={() => handleUpgradeClick('clarity')} />
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
    const type = 'cut';
    let upgradeLabel, upgradePrice, upgradePriceHuman, upgradePriceSymbol;
    const { cutDetails, cutDetailsRoundBrilliant, cutLearnMoreLink } = DiamondCfyData || {};
    const checked = checkbox.includes(type);
    const arrayWithUpgrade = [...new Set([...checkbox, type])];
    const arrayWithDowngrade = checkbox.filter((v) => v !== type);
    const upgrade = getProduct(diamondCtoData, arrayWithUpgrade);
    const downgrade = getProduct(diamondCtoData, arrayWithDowngrade);

    if (product && upgrade) {
      upgradeLabel = upgrade.cut || '';
      upgradePrice = getDiff(upgrade.price, downgrade.price, locale);
      upgradePriceSymbol = upgrade.price > downgrade.price ? '+' : '-';
      upgradePriceHuman = (
        <>
          <i>{upgradePriceSymbol}</i>
          <span>{upgradePrice}</span>
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
              <input type="checkbox" checked={checked} onChange={() => handleUpgradeClick('cut')} />
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

  // ORIGIN
  const getOriginTitle = () => {
    const title = getInfo(specs, 'origin')?.value;
    const { origin: label } = DiamondTableData || {};

    return (
      <>
        <strong className="label">{title}:</strong>
        <div className="value">
          <span>{label}</span>
        </div>
      </>
    );
  };
  const getOriginContent = () => {
    const { originContent } = DiamondTableData || {};

    return (
      <div className="description">
        <Markdown withStyles={false}>{originContent}</Markdown>
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
    {
      type: 'origin',
      title: getOriginTitle(),
      children: getOriginContent(),
      className: 'origin',
    },
  ];

  return (
    <StyledDiamondCfyAccordion>
      <Accordion rows={accordionContent} activeDefault={getActiveDefault()} isDiamondDetail={true} />
    </StyledDiamondCfyAccordion>
  );
};

function getDiff(upgrade, downgrade, locale) {
  return getFormattedPrice(Math.abs(upgrade - downgrade), locale);
}

export { DiamondCfyAccordion };

export default DiamondCfyAccordion;

function getProduct(obj = {}, arr = []) {
  const len = arr.length;

  const sortOrder = ['cut', 'color', 'clarity'];

  const sortedArray = arr.sort((a, b) => {
    const indexA = sortOrder.indexOf(a);

    const indexB = sortOrder.indexOf(b);

    if (indexA !== -1 && indexB !== -1) return indexA - indexB;

    if (indexA !== -1) return -1;

    if (indexB !== -1) return 1;

    return 0;
  });

  const key =
    len > 0
      ? `${sortedArray.reduce((a, v, i) => {
          return a + (i > 0 ? 'And' : '') + capitalizeFirstLetter(v);
        }, 'diamond')}Upgrade`
      : 'diamond';

  return obj[key];
}

import { useHumanNameMapper, useTranslations } from '@diamantaire/darkside/data/hooks';
import { EAST_WEST_SHAPES } from '@diamantaire/shared/constants';
import { generateIconImageUrl, getTranslatedName, iconLoader } from '@diamantaire/shared/helpers';
import { getIconsForDiamondType } from '@diamantaire/shared/icons';
import { OptionItemProps, OptionItemContainerProps } from '@diamantaire/shared/types';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent, useCallback, useMemo } from 'react';
import styled from 'styled-components';

/**
 * This Component is a good candidate for a globally shared component
 */

export function OptionItemContainer({
  option,
  optionType,
  isSelected,
  onClick,
  isLink,
  valueLabel,
  setProductSlug,
  selectedConfiguration,
  productType,
}: OptionItemContainerProps) {
  const {
    query: { collectionSlug },
  } = useRouter();
  const collectionSlugString = collectionSlug as string;
  const OptionItemComponent = getOptionItemComponentByType(optionType, collectionSlugString);

  return isLink ? (
    <OptionItemLink {...option} setProductSlug={setProductSlug}>
      <OptionItemComponent
        valueLabel={valueLabel}
        isSelected={isSelected}
        {...option}
        optionType={optionType}
        onClick={onClick}
        selectedConfiguration={selectedConfiguration}
        productType={productType}
      />
    </OptionItemLink>
  ) : (
    <OptionItemComponent
      isSelected={isSelected}
      {...option}
      optionType={optionType}
      onClick={onClick}
      productType={productType}
    />
  );
}

interface OptionItemLinkProps extends OptionItemProps {
  children?: React.ReactNode;
  setProductSlug: (_value: string) => void;
}

function OptionItemLink({ value, id, children, setProductSlug }: OptionItemLinkProps) {
  const router = useRouter();

  const { collectionSlug, jewelryCategory } = router.query;
  // google marketing pdp url we set
  const newPathname = router.pathname.replace('/[...productParams]', '');
  // Memoize the URL computation to prevent recalculations unless dependencies change
  const url = useMemo(() => {
    return {
      pathname: newPathname,
      query: {
        collectionSlug,
        productSlug: id,
        ...(jewelryCategory && { jewelryCategory }),
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname, collectionSlug, jewelryCategory, id]);

  // useCallback to memoize the click handler
  const handleClick = useCallback(() => {
    setProductSlug(id);
  }, [id, setProductSlug]);

  return (
    <Link href={url} replace={true} shallow={true} scroll={false} onClick={handleClick}>
      {children || value}
    </Link>
  );
}

function getOptionItemComponentByType(type: string, collectionSlug: string): FunctionComponent<OptionItemComponent> {
  switch (type) {
    case 'diamondType':
    case 'sideStoneShape':
    case 'bandStoneShape':
    case 'topDiamondShape':
    case 'bottomDiamondShape':
    case 'paveCluster': {
      return DiamondIconOptionItem;
    }
    case 'ceramicColor':
    case 'metal': {
      return MetalOptionItem;
    }
    case 'sideStoneCarat': {
      return SideStoneCaratWeightOptionItem;
    }
    case 'bandAccent': {
      return BandAccentStyleOptionItem;
    }
    case 'hoopAccent': {
      return HoopAccentStyleOptionItem;
    }
    case 'value': {
      return ValueOptionItem;
    }
    case 'bandWidth': {
      if (getShouldRenderImageButtons(collectionSlug)) {
        return BandWidthOptionItem;
      } else {
        return BasicOptionItem;
      }
    }
    case 'hiddenHalo': {
      return HiddenHaloOptionItem;
    }

    default: {
      return BasicOptionItem;
    }
  }
}

const StyledOptionItem = styled.button`
  background-color: transparent;
  padding: 0;
`;

const StyledRoundOptionItem = styled(StyledOptionItem)`
  border-radius: 50%;
  padding: 0.3rem;
  height: 3.8rem;
  width: 3.8rem;
  .inner {
    border: 1.5rem solid transparent;
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
  &.selected {
    border: 0.1rem solid var(--color-teal);
  }
`;

interface OptionItemComponent extends OptionItemProps {
  onClick: () => void;
  optionType: string;
  selectedConfiguration?: { [key: string]: string };
  productType?: string;
}

const StyledDiamondIconOptionItem = styled(StyledOptionItem)`
  .icon {
    transition: 0.25s;
    &.isRotated {
      transform: rotate(90deg) !important;
    }
  }
  &.selected {
    border-bottom: 0.2rem solid var(--color-teal);
    padding-bottom: 0.5rem;
  }

  .icon {
    gap: ${(props) => props.gap};
    display: flex;
    svg {
      height: 3.2rem;
      width: auto;
      margin: 0 auto;
      transform: ${(props) => (props.isRotated ? 'rotate(90deg)' : 'none')};
      overflow: visible;
    }
  }
`;

export function DiamondIconOptionItem({
  optionType,
  value,
  valueLabel,
  isSelected,
  onClick,
  selectedConfiguration,
}: OptionItemComponent) {
  const icons = getIconsForDiamondType(value, optionType);

  const { sideStoneOrientation } = selectedConfiguration || {};

  function getDiamondTypeGap(diamondType, isRotated) {
    if (diamondType === 'round-brilliant+pear' && isRotated) {
      return '1.8rem';
    }

    return isRotated ? '1.5rem' : '0.5rem';
  }

  if (icons.length === 0) {
    return null;
  }
  const isRotated = optionType === 'sideStoneShape' && sideStoneOrientation === 'horizontal';
  const gap = getDiamondTypeGap(value, isRotated);

  return (
    <StyledDiamondIconOptionItem
      className={clsx('option-item diamond-shape', value, {
        selected: isSelected,
        canRotate: EAST_WEST_SHAPES.includes(value),
      })}
      title={valueLabel}
      onClick={onClick}
      isRotated={isRotated}
      gap={gap}
    >
      <span className="icon">
        {icons.map((Icon, index) => (
          <Icon key={index} />
        ))}
      </span>
    </StyledDiamondIconOptionItem>
  );
}

const StyledMetalDiamondIconOption = styled(StyledRoundOptionItem)`
  .inner {
    border: none;
  }
  &.yellow-gold {
    .inner {
      background-color: rgb(200, 171, 110);
    }
  }
  &.rose-gold {
    .inner {
      background-color: rgb(206, 172, 139);
    }
  }
  &.white-gold {
    .inner {
      background: linear-gradient(305deg, rgb(254, 254, 254), rgb(206, 206, 206), transparent);
      border-color: var(--color-white);
    }
  }
  &.platinum {
    .inner {
      background-color: rgb(200, 200, 200);
    }
  }
  &.sterling-silver {
    .inner {
      background: linear-gradient(138deg, rgb(210, 210, 208) 0%, rgb(247, 247, 247) 50%, rgb(201, 202, 200) 100%);
    }
  }
  &.black {
    .inner {
      background-color: #000;
    }
  }
  &.dark-green {
    .inner {
      background-color: #1f4d4e;
    }
  }
  &.white {
    .inner {
      border: 0.1rem solid #000;
    }
  }
  &.turquoise {
    .inner {
      background-color: #4faed9;
    }
  }
  &.yellow {
    .inner {
      background-color: #e9d540;
    }
  }
  &.yellow-gold-and-platinum {
    .inner {
      background: linear-gradient(45deg, #c8ab6e 50%, #c8c8c8 50%);
    }
  }
  &.rose-gold-and-platinum {
    .inner {
      background: linear-gradient(45deg, #ceac8b 50%, #c8c8c8 50%);
    }
  }
`;

export function MetalOptionItem({ value, isSelected, onClick }: OptionItemComponent) {
  return (
    <StyledMetalDiamondIconOption className={clsx('option-item', value, { selected: isSelected })} onClick={onClick}>
      <div className="inner" />
    </StyledMetalDiamondIconOption>
  );
}

const StyledImageIconOptionItem = styled(StyledRoundOptionItem)`
  height: 3.8rem;
  width: 3.8rem;
  position: relative;

  .inner {
    justify-content: center;
    align-items: center;
    display: flex;

    img {
      border-radius: 50%;
      width: 30px;
      height: 30px;
    }
  }
`;

function ImageIconOptionItem({ value, isSelected, imgSrc, onClick }: OptionItemComponent & { imgSrc: string }) {
  return (
    <StyledImageIconOptionItem className={clsx('option-item', 'image-item', { selected: isSelected })} onClick={onClick}>
      <div className="inner">
        <Image alt={value} src={imgSrc} width={35} height={35} loader={iconLoader} />
      </div>
    </StyledImageIconOptionItem>
  );
}

export function BandAccentStyleOptionItem(props: OptionItemComponent) {
  const imgSrc = generateIconImageUrl(`category-filters-${props.value}`);

  return <ImageIconOptionItem {...props} imgSrc={imgSrc} />;
}
export function HoopAccentStyleOptionItem(props: OptionItemComponent) {
  const imgSrc = generateIconImageUrl(`category-filters-hoop-${props.value}`);

  return <ImageIconOptionItem {...props} imgSrc={imgSrc} />;
}

export function BandWidthOptionItem(props: OptionItemComponent) {
  const imgSrc = generateIconImageUrl(`bandWidth-${props.value}-placeholder`);

  return <ImageIconOptionItem {...props} imgSrc={imgSrc} />;
}

export function HiddenHaloOptionItem(props: OptionItemComponent) {
  const imgSrc = generateIconImageUrl(`hiddenHalo-${props.value}`);

  return <ImageIconOptionItem {...props} imgSrc={imgSrc} />;
}

export function SideStoneCaratWeightOptionItem(props: OptionItemComponent) {
  const sanitizedValue = props.value.replace('.', '-');
  const imgSrc = generateIconImageUrl(`three-stone-${sanitizedValue}`);

  return <ImageIconOptionItem {...props} imgSrc={imgSrc} />;
}

// Hardcoded $ sign unless we start offering other currencies
export function ValueOptionItem({ value, isSelected, onClick }: OptionItemComponent) {
  return (
    <StyledBasicOptionItem className={clsx('option-item', { selected: isSelected })} onClick={onClick}>
      ${value}
    </StyledBasicOptionItem>
  );
}

const StyledBasicOptionItem = styled(StyledOptionItem)`
  border: 0.1rem solid #d8d6d1;
  min-width: 3.6rem;
  min-height: 3.6rem;
  text-align: center;
  font-size: 1.3rem;
  color: var(--color-black);
  cursor: pointer;
  &.selected {
    border-color: var(--color-teal);
  }
  &.-other {
    white-space: nowrap;
    padding: 0.5rem;
  }

  span.em-dash {
    font-family:
      -apple-system,
      BlinkMacSystemFont,
      Segoe UI,
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      Fira Sans,
      Droid Sans,
      Helvetica Neue,
      sans-serif;
    position: relative;
    margin: 0 3px;
    width: 7px;
    height: 1px;
    background: #000;
    display: inline-block;
    top: -3px;
  }
`;

export const DynamicValueLabel = ({ value, optionType, productType }) => {
  const { locale } = useRouter();

  const { data: translations } = useHumanNameMapper(locale);
  const { _t } = useTranslations(locale);

  // Special case handling for 'other' value
  if (value === 'other' && productType !== 'Engagement Ring') {
    return _t('Select diamond');
  }

  let valueLabel;

  // Handling based on optionType
  switch (optionType) {
    case 'earringSize':
      valueLabel = value.replace('mm', '');
      break;
    case 'chainLength':
      valueLabel = value + '"';
      break;
    default:
      valueLabel = getTranslatedName({
        optionType,
        selectedOptionValue: value,
        translations,
        _t,
      });
  }

  if (optionType === 'soldAsDouble') {
    return <span dangerouslySetInnerHTML={{ __html: valueLabel }} />;
  }

  return valueLabel;
};

export function BasicOptionItem({ value, isSelected, onClick, optionType, productType }: OptionItemComponent) {
  return (
    <StyledBasicOptionItem
      className={clsx('option-item', { selected: isSelected, '-other': value === 'other' })}
      onClick={onClick}
    >
      <DynamicValueLabel value={value} optionType={optionType} productType={productType} />
    </StyledBasicOptionItem>
  );
}

export function getShouldRenderImageButtons(slug) {
  return ['signature-prong', 'classic-4-prong-dome'].includes(slug);
}

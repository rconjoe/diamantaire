import { useSingleHumanNameMapper, useTranslations } from '@diamantaire/darkside/data/hooks';
import { generateIconImageUrl, iconLoader } from '@diamantaire/shared/helpers';
import { diamondIconsMap } from '@diamantaire/shared/icons';
import { OptionItemProps, OptionItemContainerProps } from '@diamantaire/shared/types';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
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
}: OptionItemContainerProps) {
  const OptionItemComponent = getOptionItemComponentByType(optionType);

  return isLink ? (
    <OptionItemLink {...option}>
      <OptionItemComponent
        valueLabel={valueLabel}
        isSelected={isSelected}
        {...option}
        optionType={optionType}
        onClick={onClick}
      />
    </OptionItemLink>
  ) : (
    <OptionItemComponent isSelected={isSelected} {...option} optionType={optionType} onClick={onClick} />
  );
}

interface OptionItemLinkProps extends OptionItemProps {
  children?: React.ReactNode;
}

function OptionItemLink({ value, id, children }: OptionItemLinkProps) {
  const router = useRouter();

  const { collectionSlug, jewelryCategory } = router.query;

  const url = {
    pathname: router.pathname,
    query: {
      collectionSlug,
      productSlug: id,
      ...(jewelryCategory && { jewelryCategory }),
    },
  };

  return (
    <Link href={url} scroll={false}>
      {children || value}
    </Link>
  );
}

function getOptionItemComponentByType(type: string): FunctionComponent<OptionItemComponent> {
  switch (type) {
    case 'diamondType':
    case 'sideStoneShape': {
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
    case 'value': {
      return ValueOptionItem;
    }
    case 'bandWidth': {
      return BandWidthOptionItem;
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
}

const StyledDiamondIconOptionItem = styled(StyledOptionItem)`
  &.selected {
    border-bottom: 0.2rem solid var(--color-teal);
    padding-bottom: 0.5rem;
  }

  .icon {
    svg {
      height: 3.2rem;
      width: auto;
      margin: 0 auto;
      overflow: visible;
    }
  }
`;

export function DiamondIconOptionItem({ value, valueLabel, isSelected, onClick }: OptionItemComponent) {
  const DiamondIcon = diamondIconsMap[value]?.icon;

  if (!DiamondIcon) {
    return null;
  }

  return (
    <StyledDiamondIconOptionItem
      className={clsx('option-item diamond-shape', value, { selected: isSelected })}
      title={valueLabel}
      onClick={onClick}
    >
      <span className="icon">
        <DiamondIcon />
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
  padding: 0.5rem;
  min-width: 3.6rem;
  min-height: 3.6rem;
  text-align: center;
  font-size: 1.3rem;
  color: var(--color-black);
  cursor: pointer;
  &.selected {
    border-color: var(--color-teal);
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

export function BasicOptionItem({ value, isSelected, onClick, optionType }: OptionItemComponent) {
  const { locale } = useRouter();

  const { data: { ETERNITY_STYLE_HUMAN_NAMES } = {} } = useSingleHumanNameMapper(locale, 'ETERNITY_STYLE_HUMAN_NAMES');
  const { _t } = useTranslations(locale);

  let valueLabel;

  if (optionType === 'eternityStyle') {
    valueLabel = ETERNITY_STYLE_HUMAN_NAMES?.[value]?.value;
  } else if (optionType === 'earringSize') {
    valueLabel = value.replace('mm', '');
  } else if (optionType === 'chainLength') {
    valueLabel = value + '"';
  } else {
    valueLabel = _t(value.toLowerCase());
  }

  return (
    <StyledBasicOptionItem className={clsx('option-item', { selected: isSelected })} onClick={onClick}>
      {optionType === 'soldAsDouble' ? <span dangerouslySetInnerHTML={{ __html: valueLabel }}></span> : valueLabel}
    </StyledBasicOptionItem>
  );
}

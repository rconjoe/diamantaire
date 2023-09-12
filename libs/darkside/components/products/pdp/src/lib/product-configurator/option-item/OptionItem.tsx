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
      <OptionItemComponent valueLabel={valueLabel} isSelected={isSelected} {...option} onClick={onClick} />
    </OptionItemLink>
  ) : (
    <OptionItemComponent isSelected={isSelected} {...option} onClick={onClick} />
  );
}

interface OptionItemLinkProps extends OptionItemProps {
  children?: React.ReactNode;
}

function OptionItemLink({ value, id, children }: OptionItemLinkProps) {
  const router = useRouter();

  const { collectionSlug, jewelryCategory } = router.query;
  const url = { pathname: router.pathname, query: { collectionSlug, productSlug: id, jewelryCategory } };

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
    case 'metal': {
      return MetalOptionItem;
    }
    case 'sideStoneCarat': {
      return SideStoneCaratWeightOptionItem;
    }
    case 'bandAccent': {
      return BandAccentStyleOptionItem;
    }
    default: {
      return BasicOptionItem;
    }
  }
}

const StyledOptionItem = styled.div``;

const StyledRoundOptionItem = styled(StyledOptionItem)`
  border-radius: 50%;
  padding: 3px;
  height: 38px;
  width: 38px;
  .inner {
    border: 1.5px solid transparent;
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
  &.selected {
    border: 1px solid var(--color-teal);
  }
`;

interface OptionItemComponent extends OptionItemProps {
  onClick: () => void;
}

const StyledDiamondIconOptionItem = styled(StyledOptionItem)`
  &.selected {
    border-bottom: 2px solid var(--color-teal);
    padding-bottom: 5px;
  }

  .icon {
    svg {
      height: 32px;
      width: auto;
      margin: 0 auto;
    }
  }
`;

export function DiamondIconOptionItem({ value, valueLabel, isSelected, onClick }: OptionItemComponent) {
  const DiamondIcon = diamondIconsMap[value]?.icon;

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
  &.yellow-gold {
    .inner {
      background-color: rgb(200, 171, 110);
    }
  }
  &.platinum {
    .inner {
      background-color: rgb(200, 200, 200);
    }
  }
  &.white-gold {
    .inner {
      background: linear-gradient(135deg, rgb(254, 254, 254), rgb(206, 206, 206));
    }
  }
  &.rose-gold {
    .inner {
      background-color: rgb(206, 172, 139);
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
  height: 45px;
  width: 45px;
  img {
    border-radius: 50%;
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

export function SideStoneCaratWeightOptionItem(props: OptionItemComponent) {
  const sanitizedValue = props.value.replace('.', '-');
  const imgSrc = generateIconImageUrl(`three-stone-${sanitizedValue}`);

  return <ImageIconOptionItem {...props} imgSrc={imgSrc} />;
}

const StyledBasicOptionItem = styled(StyledOptionItem)`
  border: 1px solid #ccc;
  padding: 5px;
  min-width: 30px;
  text-align: center;
  font-size: 1.3rem;
  &.selected {
    border-color: var(--color-teal);
  }
`;

export function BasicOptionItem({ value, isSelected, onClick }: OptionItemComponent) {
  return (
    <StyledBasicOptionItem className={clsx('option-item', { selected: isSelected })} onClick={onClick}>
      {value}
    </StyledBasicOptionItem>
  );
}

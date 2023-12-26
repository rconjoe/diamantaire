import { useDiamondCfyData } from '@diamantaire/darkside/data/hooks';
import { IMAGE_BASE_URL } from '@diamantaire/shared/constants';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';

export const StyledDiamondPlan = styled.div`
  position: relative;
  aspect-ratio: 1/1;
  display: block;

  img {
    width: 100%;
    height: 100%;
  }

  .caption {
    position: absolute;
    width: 100%;
    bottom: 1rem;
    left: 0;
    line-height: 1.2;
    font-size: var(--font-size-xxsmall);
    padding: 0 2rem;
    color: var(--color-black);
  }
`;

const DiamondPlan = ({
  extraClass,
  diamondType,
  priority = false,
  width = 500,
  height = 500,
  withCaption = false,
}: {
  extraClass?: string;
  diamondType: string;
  priority?: boolean;
  width?: number;
  height?: number;
  withCaption?: boolean;
}) => {
  const route = useRouter();

  const { locale } = route;

  const { data: { ctoDiamondTable: { ctoDiamondResultPolishingPlanImageCaption = '' } = {} } = {} } =
    useDiamondCfyData(locale);

  const src = `${IMAGE_BASE_URL}/cto-diamonds/rough-cut-plan-images/${diamondType}-cut-plan.jpg`;

  return (
    <StyledDiamondPlan className={`diamond-rough ${extraClass}`}>
      <Image src={src} width={width} height={height} alt={ctoDiamondResultPolishingPlanImageCaption} priority={priority} />

      {withCaption && <div className="caption">{ctoDiamondResultPolishingPlanImageCaption}</div>}
    </StyledDiamondPlan>
  );
};

export default DiamondPlan;

export { DiamondPlan };

import { useDiamondCfyData } from '@diamantaire/darkside/data/hooks';
import { IMAGE_BASE_URL } from '@diamantaire/shared/constants';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';

export const StyledDiamondRough = styled.div`
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
    font-size: var(--font-size-xxxsmall);
    padding: 0 2rem;
    color: var(--color-black);
  }
`;

const DiamondRough = ({
  extraClass,
  priority = false,
  width = 500,
  height = 500,
  withCaption = false,
}: {
  extraClass?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  withCaption?: boolean;
}) => {
  const route = useRouter();

  const { locale } = route;

  const { data: { ctoDiamondTable: { ctoDiamondResultRoughImageCaption = '' } = {} } = {} } = useDiamondCfyData(locale);

  const src = `${IMAGE_BASE_URL}/diamond-images-v3/rough.png`;

  return (
    <StyledDiamondRough className={`diamond-rough ${extraClass}`}>
      <Image src={src} width={width} height={height} alt={ctoDiamondResultRoughImageCaption} priority={priority} />

      {withCaption && <div className="caption">{ctoDiamondResultRoughImageCaption}</div>}
    </StyledDiamondRough>
  );
};

export default DiamondRough;

export { DiamondRough };

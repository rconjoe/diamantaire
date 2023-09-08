import { getCdnImageUrl, getDiamondType } from '@diamantaire/shared/helpers';
import Image from 'next/image';
import React from 'react';

interface PolishingPlanImageProps {
  imageId: string;
  diamondTypeName?: string;
  extraClass?: string;
  imageWidth?: number;
  caption?: string;
}

const PolishingPlanImage: React.FC<PolishingPlanImageProps> = ({
  imageId,
  extraClass,
  caption = 'Image of polishing plan',
  diamondTypeName,
}) => {
  const imageUrl = getCdnImageUrl(`cto-diamonds/rough-cut-plan-images`)(imageId)({ ext: 'jpg' });

  return (
    <div className="mediaContainer">
      <Image
        alt={diamondTypeName && `${caption} of ${diamondTypeName}`}
        className={extraClass}
        src={imageUrl}
        width={300}
        height={300}
      />
    </div>
  );
};

interface GenericPolishingPlanImageProps {
  diamondType?: string;
}

const GenericPolishingPlanImage: React.FC<GenericPolishingPlanImageProps> = ({ diamondType = 'round-brilliant' }) => {
  const getPlanId = (diamondType: string | undefined) => `${diamondType}-cut-plan`;

  return <PolishingPlanImage imageId={getPlanId(diamondType)} diamondTypeName={getDiamondType(diamondType).title} />;
};

export { GenericPolishingPlanImage, PolishingPlanImage };

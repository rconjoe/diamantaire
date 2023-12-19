import { SpriteSpinner, UIString } from '@diamantaire/darkside/components/common-ui';
import { canUseWebP, generateCfyDiamondSpriteThumbUrl, generateDiamondSpriteUrl } from '@diamantaire/shared/helpers';
import { DiamondCtoDataTypes, DiamondDataTypes } from '@diamantaire/shared/types';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

import StyledDiamond360 from './Diamond360.style';

interface Diamond360Props {
  diamond?: DiamondDataTypes | DiamondCtoDataTypes;
  className?: string;
  diamondType?: string;
  lotId?: string;
  useImageOnly?: boolean;
  isCto?: boolean;
  disabled?: boolean;
  noCaption?: boolean;
}

const Diamond360 = ({
  diamond,
  lotId,
  diamondType,
  useImageOnly,
  className,
  isCto,
  disabled,
  noCaption,
}: Diamond360Props) => {
  const diamondID = diamond?.lotId || lotId;

  const id = diamondID.includes('cfy-')
    ? diamondID
    : diamondID
        .split('')
        .filter((v) => !isNaN(Number(v)))
        .join('');

  const [mediaType, setMediaType] = useState('diamond-image');

  const [mediaJpgFallback, setMediaJpgFallback] = useState(false);

  const fetchMediaType = useCallback(async () => {
    const isWebPCompatible = canUseWebP();

    if (!isWebPCompatible) {
      setMediaJpgFallback(true);
    }

    if (diamondID) {
      const diamond360SpriteUrl = generateDiamondSpriteUrl(id, 'webp');

      // HEAD fetch method fetches the metadata without the body
      const response = await fetch(diamond360SpriteUrl, {
        method: 'HEAD',
      });

      if (!response.ok) {
        const diamond360SpriteJpgUrl = generateDiamondSpriteUrl(id, 'jpg');
        const responseJpg = await fetch(diamond360SpriteJpgUrl, {
          method: 'HEAD',
        });

        if (!responseJpg.ok) {
          setMediaType('diamond-image');
        } else {
          setMediaJpgFallback(true);
        }
      } else {
        setMediaType('diamond-video');
      }
    }
  }, [id, diamondID]);

  const renderMedia = () => {
    if (disabled || useImageOnly || mediaType === 'diamond-image') {
      const spriteImageUrl = generateCfyDiamondSpriteThumbUrl(diamondType);

      return <Image priority src={spriteImageUrl} alt={diamondType} width={500} height={500} />;
    }

    if (mediaType === 'diamond-video') {
      const spriteImageUrl = generateDiamondSpriteUrl(id, mediaJpgFallback ? 'jpg' : 'webp');

      return (
        <SpriteSpinner
          disableCaption={true}
          shouldStartSpinner={true}
          spriteImage={spriteImageUrl}
          bunnyBaseURL={spriteImageUrl}
        />
      );
    }
  };

  useEffect(() => {
    // fetchMediaType();
  }, [diamondID, fetchMediaType]);

  return (
    mediaType && (
      <StyledDiamond360 className={className}>
        {renderMedia()}

        {!noCaption && (
          <>
            {isCto && mediaType === 'diamond-video' && (
              <div className="caption">
                <UIString>Example of how it will look cut and polished</UIString>
              </div>
            )}

            {!disabled && !useImageOnly && !isCto && mediaType === 'diamond-video' && (
              <div className="caption">
                <UIString>Interactive actual diamond video</UIString>
              </div>
            )}
          </>
        )}
      </StyledDiamond360>
    )
  );
};

export default Diamond360;

export { Diamond360 };

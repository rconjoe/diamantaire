import { SpriteSpinner, UIString } from '@diamantaire/darkside/components/common-ui';
import { canUseWebP, generateCfyDiamondSpriteThumbUrl, generateDiamondSpriteUrl } from '@diamantaire/shared/helpers';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import StyledDiamond360 from './Diamond360.style';

interface Diamond360Props {
  className?: string;
  diamondType?: string;
  lotId?: string;
  useImageOnly?: boolean;
  isCto?: boolean;
  disabled?: boolean;
  noCaption?: boolean;
}

const Diamond360 = ({ lotId, diamondType, useImageOnly, className, isCto, disabled, noCaption }: Diamond360Props) => {
  const id = lotId.includes('cfy-')
    ? lotId
    : lotId
        .split('')
        .filter((v) => !isNaN(Number(v)))
        .join('');

  const [mediaType, setMediaType] = useState(null);

  const [mediaJpgFallback, setMediaJpgFallback] = useState(false);

  const fetchMediaType = async (): Promise<void> => {
    const isWebPCompatible = canUseWebP();

    if (!isWebPCompatible) {
      setMediaJpgFallback(true);
    }

    if (lotId) {
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
  };

  const renderMedia = () => {
    if (disabled) {
      return (
        <Image
          alt={diamondType}
          src={`https://videos.diamondfoundry.com/${lotId}-thumb.jpg`}
          sizes="100vw"
          height={0}
          width={0}
        />
      );
    }

    if (useImageOnly || mediaType === 'diamond-image') {
      const spriteImageUrl = generateCfyDiamondSpriteThumbUrl(diamondType);

      return <Image src={spriteImageUrl} alt={diamondType} width={0} height={0} sizes="100vw" />;
    }

    if (mediaType === 'diamond-video') {
      const spriteImageUrl = generateDiamondSpriteUrl(id, mediaJpgFallback ? 'jpg' : 'webp');

      return <SpriteSpinner shouldStartSpinner={true} bunnyBaseURL={spriteImageUrl} />;
    }
  };

  useEffect(() => {
    fetchMediaType();
  }, [lotId, fetchMediaType]);

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

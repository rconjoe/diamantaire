import { SpriteSpinner } from '@diamantaire/darkside/components/common-ui';
import { generateDiamondSpriteUrl, canUseWebP } from '@diamantaire/shared/helpers';
import { useState, useEffect } from 'react';

import StyledDiamond360 from './Diamond360.style';
import DiamondImage from './DiamondImage';

interface Diamond360Props {
  className?: string;
  diamondType: string;
  lotId: string;
  useImageOnly?: boolean;
}

const Diamond360 = ({ lotId, diamondType, useImageOnly, className }: Diamond360Props) => {
  const id = lotId
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
    if (useImageOnly || mediaType === 'diamond-image') {
      return <DiamondImage className={className} diamondType={diamondType} />;
    }

    if (mediaType === 'diamond-video') {
      const spriteImageUrl = generateDiamondSpriteUrl(id, mediaJpgFallback ? 'jpg' : 'webp');

      return <SpriteSpinner shouldStartSpinner={true} bunnyBaseURL={spriteImageUrl} />;
    }
  };

  useEffect(() => {
    fetchMediaType();
  }, [lotId]);

  return mediaType && <StyledDiamond360>{renderMedia()}</StyledDiamond360>;
};

export default Diamond360;

export { Diamond360 };

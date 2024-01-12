import { SpriteSpinner, UIString } from '@diamantaire/darkside/components/common-ui';
import { generateCfyDiamondSpriteThumbUrl, generateDiamondSpriteUrl } from '@diamantaire/shared/helpers';
import { DiamondCtoDataTypes, DiamondDataTypes } from '@diamantaire/shared/types';
import { AnimatePresence, motion } from 'framer-motion';
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
  width?: number;
  height?: number;
  priority?: boolean;
  caption?: string;
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
  width = 500,
  height = 500,
  priority = false,
  caption = 'Example of how it will look cut and polished',
}: Diamond360Props) => {
  const [vid, setVid] = useState(null);

  const diamondID = diamond?.lotId || lotId;

  const fetchVideo = useCallback(
    async (diamondID) => {
      const webpSprite = generateDiamondSpriteUrl(diamondID, 'webp');
      const webp = await fetch(webpSprite, { method: 'HEAD' });

      if (webp.ok) {
        setVid(
          <SpriteSpinner
            disableCaption={true}
            shouldStartSpinner={true}
            spriteImage={webpSprite}
            bunnyBaseURL={webpSprite}
          />,
        );
      } else {
        const jpgSprite = generateDiamondSpriteUrl(diamondID, 'jpg');
        const jpg = await fetch(jpgSprite, { method: 'HEAD' });

        if (jpg.ok) {
          setVid(
            <SpriteSpinner
              disableCaption={true}
              shouldStartSpinner={true}
              spriteImage={jpgSprite}
              bunnyBaseURL={jpgSprite}
            />,
          );
        }
      }
    },
    [diamondID],
  );

  useEffect(() => {
    const id = diamondID.includes('cfy-')
      ? diamondID
      : diamondID
          .split('')
          .filter((v) => !isNaN(Number(v)))
          .join('');

    if (!disabled && !useImageOnly) {
      fetchVideo(id);
    }
  }, [diamondID]);

  const img = () => {
    const spriteImageUrl = generateCfyDiamondSpriteThumbUrl(diamondType);

    return <Image priority={priority} src={spriteImageUrl} alt={diamondType} width={width} height={height} />;
  };

  return (
    <StyledDiamond360 className={className}>
      <div className="img">{img()}</div>

      {!disabled && !useImageOnly && (
        <AnimatePresence>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="vid">{vid}</div>
          </motion.div>
        </AnimatePresence>
      )}

      {!noCaption && vid && (
        <>
          {isCto && (
            <div className="caption">
              <UIString>{caption}</UIString>
            </div>
          )}

          {!disabled && !useImageOnly && !isCto && (
            <div className="caption">
              <UIString>Interactive actual diamond video</UIString>
            </div>
          )}
        </>
      )}
    </StyledDiamond360>
  );
};

export default Diamond360;

export { Diamond360 };

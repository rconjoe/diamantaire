import { UIString } from '@diamantaire/darkside/components/common-ui';
import { generateDiamondSpriteImage, generateDiamondSpriteUrl } from '@diamantaire/shared/helpers';
import { DiamondCtoDataTypes, DiamondDataTypes } from '@diamantaire/shared/types';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';

import StyledDiamond360 from './Diamond360.style';
import DiamondImage from './DiamondImage';
// See https://www.npmjs.com/package/react-player
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

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
  // priority = false,
  caption = 'Example of how it will look cut and polished',
}: Diamond360Props) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [showFallback, setShowFallback] = useState(false);
  const diamondID = diamond?.lotId || lotId;

  const checkAssets = useCallback(async () => {
    const id = diamondID?.includes('cfy-') ? diamondID : diamondID?.replace(/\D/g, '');

    if (useImageOnly || disabled) {
      const imageUrl = generateDiamondSpriteImage({ diamondID: id, diamondType });

      try {
        const imageExists = await fetch(imageUrl, { method: 'HEAD' }).then((res) => res.ok);

        if (imageExists) {
          setImageSrc(imageUrl);
        } else {
          setShowFallback(true);
        }
      } catch (error) {
        setShowFallback(true);
      }
    } else if (id) {
      const videoUrl = generateDiamondSpriteUrl(id, 'mp4');

      setVideoSrc(videoUrl);
    }
  }, [diamondID, diamondType, useImageOnly, disabled]);

  useEffect(() => {
    checkAssets();
  }, [checkAssets]);

  const spriteImageUrl = generateDiamondSpriteImage({ diamondID, diamondType });

  return (
    <StyledDiamond360 className={className}>
      {showFallback ? (
        <div className="img">
          <DiamondImage diamondType={diamondType} />
        </div>
      ) : imageSrc ? (
        <Image src={imageSrc} alt={diamondType} width={width} height={height} />
      ) : videoSrc ? (
        <AnimatePresence>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <ReactPlayer
              url={videoSrc}
              playing
              playsinline
              loop
              muted
              height="100%"
              width="100%"
              controls={false}
              onError={() => setShowFallback(true)}
              config={{
                file: {
                  attributes: {
                    poster: spriteImageUrl,
                  },
                },
              }}
            />
          </motion.div>
        </AnimatePresence>
      ) : null}

      {!noCaption && (
        <>
          {isCto && (
            <div className="caption">
              <UIString>{caption}</UIString>
            </div>
          )}

          {!disabled && !useImageOnly && !isCto && !showFallback && (
            <div className="caption">
              <UIString>Actual video of diamond</UIString>
            </div>
          )}
        </>
      )}
    </StyledDiamond360>
  );
};

export default Diamond360;

export { Diamond360 };

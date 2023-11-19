import { DIAMOND_VIDEO_BASE_URL } from '@diamantaire/shared/constants';
import { getNumericalLotId } from '@diamantaire/shared-diamond';

type DiamondVideoThumbImageProps = {
  lotId: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
};

const DiamondVideoThumbImage = ({ lotId, alt, className, width = 400, height = 400 }: DiamondVideoThumbImageProps) => {
  const numericalLotId = getNumericalLotId(lotId);
  const src = `${DIAMOND_VIDEO_BASE_URL}/${numericalLotId}-thumb.jpg`;

  const loader = ({ src, width, quality = 50 }: ImageLoaderProps) => {
    const datoUrl = new URL(src);

    const params = {
      w: width.toString(),
      q: quality.toString(),
      // ...(enableDpr && { dpr: '2' }),
    };

    for (const [key, value] of Object.entries(params)) {
      if (value) {
        datoUrl.searchParams.set(key, value);
      }
    }

    return datoUrl.toString();
  };

  // return <Image src={src} alt={alt} width={width} height={height} sizes="100%" className={className} loader={loader} />;
  return <img src={src} alt="" />;
};

export { DiamondVideoThumbImage };

// https://videos.diamondfoundry.com/543565-thumb.jpg
// https://videos.diamondfoundry.com/581584-thumb.jpg

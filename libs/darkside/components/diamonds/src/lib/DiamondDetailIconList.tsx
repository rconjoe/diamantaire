import { SlideOut, UniLink } from '@diamantaire/darkside/components/common-ui';
import { GlobalContext } from '@diamantaire/darkside/context/global-context';
import { useDiamondInfoData, useDiamondPdpData, useProductIconList } from '@diamantaire/darkside/data/hooks';
import { DEFAULT_LOCALE } from '@diamantaire/shared/constants';
import { DiamondIcon } from '@diamantaire/shared/icons';
import { AnimatePresence } from 'framer-motion';
import Markdown from 'markdown-to-jsx';
import Image from 'next/image';
import { useContext, useState } from 'react';

import { StyledDiamondDetailIconList } from './DiamondDetailIconList.style';

const DiamondDetailIconList = ({ locale = DEFAULT_LOCALE }: { locale?: string }) => {
  const [isSlideOutOpen, setIsSlideOutOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { isMobile } = useContext(GlobalContext);

  const info: any = useDiamondInfoData(locale)?.data?.additionalInfo ?? {};
  const productTitle = useDiamondPdpData(locale)?.data?.diamondProduct?.productTitle || '';
  const items = useProductIconList('Diamond PDP', locale)?.data?.productIconList?.items ?? [];

  const handleOpenSlideOut = () => {
    const currentScrollPosition = document.body.scrollTop || document.documentElement.scrollTop;

    setScrollPosition(currentScrollPosition);

    setIsSlideOutOpen(true);
  };

  const handleCloseSlideOut = () => {
    setIsSlideOutOpen(false);
  };

  return (
    <StyledDiamondDetailIconList className="icon-list">
      <div className="icon-list-item slideout-link">
        <div className="icon">
          <DiamondIcon />
        </div>

        <p>{productTitle}</p>

        <div className="slideout-trigger" onClick={handleOpenSlideOut}>
          <span>i</span>
        </div>
      </div>

      <div className="icon-list-item waranty-link">
        {Object.values(items || {}).map((v) => {
          if (v.ctaRoute.includes('guarantee')) {
            return (
              <UniLink route={v.ctaRoute} key={v.ctaRoute}>
                <div className="icon">
                  <Image src={v.icon.url} alt={''} width={0} height={0} sizes="100vw" />
                </div>
                {v.copy && <p>{v.copy}</p>}
                {v.ctaCopy && <p>{v.ctaCopy}</p>}
              </UniLink>
            );
          }

          return null;
        })}
      </div>

      <AnimatePresence>
        {isSlideOutOpen && (
          <SlideOut
            title={productTitle}
            onClose={handleCloseSlideOut}
            width={isMobile ? '100%' : '560px'}
            className="slideout"
            scrollPosition={scrollPosition}
          >
            <div
              style={{
                width: '100%',
                position: 'relative',
                paddingBottom: `calc(${isMobile ? `223 / 335` : `347 / 520`} * 100%)`,
              }}
            >
              <Image loading="eager" alt={info.image.alt} src={info.image.url} fill style={{ objectFit: 'cover' }} />
            </div>
            <Markdown>{info.text}</Markdown>
          </SlideOut>
        )}
      </AnimatePresence>
    </StyledDiamondDetailIconList>
  );
};

export { DiamondDetailIconList };

export default DiamondDetailIconList;

import { Heading, Markdown } from '@diamantaire/darkside/components/common-ui';
import { useDiamondCfyData } from '@diamantaire/darkside/data/hooks';
import { getCdnImageUrl, getDiamondType } from '@diamantaire/shared/helpers';
import { ArrowBoldRightIcon, diamondIconsMap } from '@diamantaire/shared/icons';
import Image from 'next/image';
import { ReactNode } from 'react';

import Diamond360 from './Diamond360';
import StyledDiamondCfyGallery from './DiamondCfyGallery.style';
import { GenericPolishingPlanImage } from './DiamondCfyPolishingPlanImage';

interface HowItWorksItemProps {
  children?: ReactNode;
  title?: string;
  headingType?: string;
  headingAdditionalClass?: string;
  copy?: string;
  isLastItem?: boolean;
}

const HowItWorksItem: React.FC<HowItWorksItemProps> = ({
  children,
  title,
  headingType,
  headingAdditionalClass,
  copy,
  isLastItem,
}) => {
  return (
    <div className="howItWorksCard">
      <div className="inner">
        {children}
        <div>
          {title && (
            <Heading
              className={'howItWorksHeader ' + headingAdditionalClass ?? headingAdditionalClass}
              type={headingType ? headingType : 'h2'}
            >
              {title}
            </Heading>
          )}

          {copy && (
            <div className="howItWorksCopy">
              <Markdown withStyles={false} options={{ forceBlock: true }}>
                {copy}
              </Markdown>

              {!isLastItem && (
                <div className="mobile-arrow">
                  <ArrowBoldRightIcon />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {!isLastItem && (
        <div className="arrow">
          <ArrowBoldRightIcon />
        </div>
      )}
    </div>
  );
};

interface DiamondCfyGalleryProps {
  diamondType: string;
  locale: string;
}

const DiamondCfyGallery: React.FC<DiamondCfyGalleryProps> = ({ locale, diamondType }) => {
  const diamondTypeName = getDiamondType(diamondType).title;
  const diamondTypeSlug = getDiamondType(diamondType).slug;
  const { data: { ctoDiamondTable: diamondCfyData } = {} } = useDiamondCfyData(locale);
  const { ctoDiamondResultHowItWorks } = diamondCfyData;

  console.log(`diamondCfyData`, diamondCfyData);
  console.log(`ctoDiamondResultHowItWorks`, ctoDiamondResultHowItWorks);
  console.log(`{ diamondType, diamondSlug, diamondName }`, { diamondType, diamondTypeSlug, diamondTypeName });

  return (
    <StyledDiamondCfyGallery>
      {ctoDiamondResultHowItWorks
        ? ctoDiamondResultHowItWorks?.map((contentBlock, index) => {
            const { title, content, additionalClass, headingType, headingAdditionalClass } = contentBlock;
            const { blocks } = content;

            return (
              <div className={'howItWorksWrapper ' + additionalClass ?? additionalClass} key={`placeholder-${index}`}>
                <Heading
                  className={'section-title ' + headingAdditionalClass ?? headingAdditionalClass}
                  type={headingType ? headingType : 'h2'}
                >
                  {title}
                </Heading>

                <div className="howItWorksBlocksWrapper">
                  {blocks &&
                    blocks?.map((block, idx) => {
                      const { media } = block;

                      console.log(`block`, block);

                      if (idx === 0) {
                        const shape = diamondIconsMap[diamondTypeSlug];

                        return (
                          <HowItWorksItem key={idx} {...block}>
                            <div className="circularImage -bg-color">
                              <div className="diamondTypeIcon">
                                <shape.icon />
                              </div>
                            </div>
                          </HowItWorksItem>
                        );
                      }
                      if (idx === 1) {
                        const src = getCdnImageUrl(`diamond-images-v3`)(`rough`)({ ext: 'png' });

                        return (
                          <HowItWorksItem key={idx} {...block}>
                            <div className="circularImage">
                              <Image alt="Image of a cut for you rough diamond block" src={src} width={300} height={300} />
                            </div>
                          </HowItWorksItem>
                        );
                      }
                      if (idx === 2) {
                        return (
                          <HowItWorksItem key={idx} {...block}>
                            <div className="circularImage">
                              <GenericPolishingPlanImage diamondType={diamondTypeSlug} />
                            </div>
                          </HowItWorksItem>
                        );
                      }
                      if (idx === 3) {
                        return (
                          <HowItWorksItem key={idx} {...block}>
                            <div className="circularImage">
                              <Image alt="" height={300} width={300} src={media.url} />
                            </div>
                          </HowItWorksItem>
                        );
                      }
                      if (idx === 4) {
                        return (
                          <HowItWorksItem key={idx} {...block} isLastItem={true}>
                            <div className="circularImage -bg-color">
                              <div className="diamondImage">
                                <Diamond360 disabled={true} diamondType={diamondTypeSlug} lotId={`cfy-${diamondTypeSlug}`} />
                              </div>
                            </div>
                          </HowItWorksItem>
                        );
                      }

                      return;
                    })}
                </div>
              </div>
            );
          })
        : null}
    </StyledDiamondCfyGallery>
  );
};

export default DiamondCfyGallery;

export { DiamondCfyGallery };

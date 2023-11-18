import { DarksideButton, Heading, ImageTile } from '@diamantaire/darkside/components/common-ui';
import { DatoDarksideButtonProps, DatoImageType } from '@diamantaire/shared/types';

import { ModularCelebrityReelRowStyles } from './ModularCelebrityReelRow.style';

type ModularCelebrityReelRowProps = {
  title: string;
  blocks: {
    id: string;
    title: string;
    desktopImage: DatoImageType;
  }[];
  darksideButtons: DatoDarksideButtonProps[];
};

const ModularCelebrityReelRow = (props: ModularCelebrityReelRowProps) => {
  const { title, blocks, darksideButtons } = props || {};

  return (
    <ModularCelebrityReelRowStyles>
      <div className="title-container container-wrapper text-center">
        <Heading type="h2" className="h1 primary">
          {title}
        </Heading>
      </div>
      <div className="celeb-container container-wrapper">
        {blocks.map((block) => {
          const { title: tileTitle, desktopImage: image, id } = block || {};

          return <ImageTile key={id} title={tileTitle} image={image} />;
        })}
      </div>

      <div className="cta-container">
        {darksideButtons?.map((button) => {
          return (
            <DarksideButton
              colorTheme={button.ctaButtonColorTheme}
              mobileColorTheme={button.ctaButtonMobileColorTheme}
              href={button.ctaLinkUrl}
              key={button.id}
              type={button.ctaButtonType}
            >
              {button.ctaCopy}
            </DarksideButton>
          );
        })}
      </div>
    </ModularCelebrityReelRowStyles>
  );
};

export default ModularCelebrityReelRow;

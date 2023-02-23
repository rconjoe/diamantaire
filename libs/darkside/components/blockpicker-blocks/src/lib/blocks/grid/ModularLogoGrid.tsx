/*
    This is a logo grid. Currently works with 4 items, but can easily be expanded to use more/less columns
    TODO: We need to replace the svg logos (yes, svgs) in dato with pngs so we can use them in our Image component
    TODO: we need to discuss how we're going to standardize image interfaces/types
*/

import clsx from 'clsx';

import { ModularLogoGridContainer } from './ModularQuadLogoGrid.style';

export interface imageProps {
  id?: string;
  url?: string;
  alt?: string;
}

type ModularLogoGridProps = {
  title?: string;
  additionalClass?: string;
  image1?: imageProps;
  image2?: imageProps;
  image3?: imageProps;
  image4?: imageProps;
};

const ModularLogoGrid = ({ title, additionalClass, image1, image2, image3, image4 }: ModularLogoGridProps) => {
  const collection = [image1, image2, image3, image4];

  return (
    <ModularLogoGridContainer className={additionalClass}>
      <h1 className={clsx('logo-grid__title', additionalClass)}>{title}</h1>

      <div className={clsx('logo-grid__logos-container', additionalClass)}>
        {collection.map((image) => {
          if (!image) {
            return null;
          }
          const { alt, url, id } = image;

          return (
            <img
              className={clsx('logos-grid__logo', additionalClass, {
                '-is-coveteur': url.includes('coveteur'),
              })}
              key={id}
              src={url}
              alt={alt}
            />
          );
        })}
      </div>
    </ModularLogoGridContainer>
  );
};

export default ModularLogoGrid;

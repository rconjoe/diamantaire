export interface BasicImageRequirements {
  image: {
    url: string;
    alt?: string;
    responsiveImage: {
      height: number;
      width: number;
    };
  };
}

export interface ResponsiveImageRequirements {
  desktopImage: {
    url: string;
    responsiveImage: {
      height: number;
      width: number;
    };
  };
  mobileImage: {
    url: string;
    responsiveImage: {
      height: number;
      width: number;
    };
  };
}

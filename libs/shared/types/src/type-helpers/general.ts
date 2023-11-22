export interface DatoImageType {
  mimeType?: string;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  src?: string;
  responsiveImage?: {
    src: string;
    width: number;
    height: number;
    base64: string;
    aspectRatio: number;
  };
  video?: {
    streamingUrl: string;
  };
}

export type ErrorWithMessage = {
  message: string;
};

export type DatoDarksideButtonProps = {
  id: string;
  ctaCopy: string;
  ctaLinkUrl: string;
  ctaButtonType: 'solid' | 'outline' | 'underline';
  ctaButtonColorTheme: 'black' | 'teal' | 'white';
  ctaButtonMobileColorTheme: 'black' | 'teal' | 'white';
  openUrlInNewWindow: boolean;
};

export type DarksideButtonProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  buttonType?: 'button' | 'submit' | 'reset';
  type?: 'solid' | 'outline' | 'underline' | 'text-underline';
  colorTheme?: 'black' | 'teal' | 'white' | 'grey';
  mobileColorTheme?: 'desktop' | 'black' | 'teal' | 'white';
  openUrlInNewWindow?: boolean;
  disabled?: boolean;
};

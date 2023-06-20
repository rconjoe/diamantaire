export interface DatoImageType {
  mimeType?: string;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
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

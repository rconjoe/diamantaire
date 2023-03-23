export interface DatoImageType {
  mimeType?: string;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  responsiveImage?: {
    width: number;
    height: number;
    base64: string;
    aspectRatio: number;
  };
}

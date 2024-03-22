export enum MimeTypes {
  ImagePng = 'image/png',
  ImageJpeg = 'image/jpeg',
  VideoMP4 = 'video/mp4',
  VideoMov = 'video/mov',
  QuicktimeVideo = 'video/quicktime',
}

export interface MediaAsset {
  id: string;
  url: string;
  alt?: string;
  title?: string;
  mimeType: MimeTypes;
  shouldLazyLoad?: boolean;
  customData?: {
    sprite?: string;
    mobile?: string;
    bunny?: string;
  };
}

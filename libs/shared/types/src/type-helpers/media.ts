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
  mimeType: MimeTypes;
  customData?: {
    sprite?: boolean;
    mobile?: boolean;
    bunny?: string;
  };
}

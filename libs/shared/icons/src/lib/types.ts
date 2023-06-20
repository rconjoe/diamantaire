export declare type StaticImageData = {
  src: string;
  height: number;
  width: number;
  placeholder?: string;
  alt?: string;
};

export interface BaseIconType {
  image: StaticImageData;
  alt?: string;
  loading?: 'lazy' | 'eager';
}

export interface IconType {
  alt?: string;
  loading?: 'lazy' | 'eager';
}

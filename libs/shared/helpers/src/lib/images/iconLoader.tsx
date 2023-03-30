import { ImageLoaderProps } from 'next/image';

export function iconLoader({ src, quality = 25, width = 50 }: ImageLoaderProps) {
  const qParams = new URLSearchParams({ q: quality.toString(), auto: 'format', w: width.toString() });

  return `${src}?${qParams.toString()}`;
}

import { SpriteSpinner } from '@diamantaire/darkside/components/common-ui';
import { useRouter } from 'next/router';

export function SpriteSpinnerBlock({ sprite, options, srcType, mobile }) {
  const { diamondType, bandAccent, metal } = options;
  const spriteImage = sprite.url;
  const { query } = useRouter();
  const bunny360BaseURL = `https://vrai-assets.b-cdn.net/${query.collectionSlug}/${diamondType}/${
    bandAccent ? bandAccent + '/' : ''
  }${metal}`;

  return (
    <SpriteSpinner
      spriteImage={spriteImage}
      spriteSource={srcType}
      bunnyBaseURL={bunny360BaseURL}
      shouldStartSpinner={true}
      mobile={mobile}
    />
  );
}

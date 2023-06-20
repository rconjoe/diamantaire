import Script from 'next/script';

const SpriteSpinnerInit = () => {
  return (
    <>
      <Script src="https://code.jquery.com/jquery-3.4.1.min.js" strategy={'beforeInteractive'} />
      <Script src="https://cdn.jsdelivr.net/npm/spritespin@4.1.0/release/spritespin.min.js" strategy={'beforeInteractive'} />
    </>
  );
};

export { SpriteSpinnerInit };

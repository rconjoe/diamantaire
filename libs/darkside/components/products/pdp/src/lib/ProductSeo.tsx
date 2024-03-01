import { useTranslations, useVariantInventory } from '@diamantaire/darkside/data/hooks';
import { getCurrency, parseValidLocale } from '@diamantaire/shared/constants';
import { createLongProductTitle, replacePlaceholders } from '@diamantaire/shared/helpers';
import { generateProductUrl } from '@diamantaire/shared-product';
import { useRouter } from 'next/router';
import { NextSeo, ProductJsonLd } from 'next-seo';

const ProductSeo = ({
  seoFields,
  legacySeoFields,
  productType,
  productTitle,
  metal,
  diamondType,
  canonicalVars,
  assets,
  shopifyProductData,
}) => {
  const { seoTitle, seoDescription } = legacySeoFields || {};
  const { locale } = useRouter();
  const { languageCode: selectedLanguageCode } = parseValidLocale(locale);
  const { _t } = useTranslations(locale);

  const { collectionSlug, productSlug } = canonicalVars || {};

  const longTitle = createLongProductTitle({
    title: productTitle,
    diamondType,
    productType,
    selectedLanguageCode,
    _t,
    enableMetal: true,
    metal,
  });

  let metaTitle =
    // Generate title as fallback for ERs
    seoFields ? seoFields.seoTitle : productType === 'Engagement Ring' ? `${longTitle} | VRAI` : seoTitle;

  metaTitle = replacePlaceholders(metaTitle, ['%%product_type%%'], [productType]).toString();
  metaTitle = replacePlaceholders(metaTitle, ['%%diamond_type%%'], [_t(diamondType)]).toString();

  let metaDescription = seoFields
    ? replacePlaceholders(seoFields?.seoDescription, ['%%product_name%%'], [productTitle]).toString()
    : replacePlaceholders(seoDescription, ['%%product_name%%'], [productTitle]).toString();

  metaDescription = replacePlaceholders(metaDescription, ['%%product_type%%'], [productType]).toString();
  metaDescription = replacePlaceholders(metaDescription, ['%%diamond_type%%'], [diamondType]).toString();

  const seoParam = {
    en: '',
    es: '/en-ES/',
    fr: '/fr-FR/',
    de: '/de-DE/',
  };

  const baseUrl =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' || process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? 'https://www.vrai.com'
      : 'http://localhost:4200';

  const seoImages = assets?.filter((asset) => asset.mimeType === 'image/jpeg').map((asset) => asset.url);

  const { countryCode } = parseValidLocale(locale);
  const currency = getCurrency(countryCode);

  const { isInStock } = useVariantInventory(
    shopifyProductData?.shopifyVariantId,
    Boolean(shopifyProductData?.trackInventory),
  );

  return (
    <>
      <NextSeo
        title={metaTitle}
        description={metaDescription}
        canonical={baseUrl + seoParam[selectedLanguageCode] + generateProductUrl(productType, collectionSlug, productSlug)}
      />
      {/* We need endpoints to full flush this out */}
      <ProductJsonLd
        productName={metaTitle}
        images={seoImages}
        description={metaDescription}
        brand="VRAI"
        material={metal}
        offers={[
          {
            price: '119.99',
            priceCurrency: currency,
            itemCondition: 'https://schema.org/NewCondition',
            availability: `https://schema.org/${isInStock ? 'InStock' : 'OutOfStock'}`,
            url: window.location.href,
            seller: {
              name: 'VRAI',
            },
          },
        ]}
        // color="blue"
        // manufacturerName="Gary Meehan"
        // manufacturerLogo="https://www.example.com/photos/logo.jpg"
        // slogan="For the business traveller looking for something to drop from a height."
        // disambiguatingDescription="Executive Anvil, perfect for the business traveller."
        // releaseDate="2014-02-05T08:00:00+08:00"
        // productionDate="2015-02-05T08:00:00+08:00"
        // purchaseDate="2015-02-06T08:00:00+08:00"
        // award="Best Executive Anvil Award."
        // reviews={[
        //   {
        //     author: 'Jim',
        //     datePublished: '2017-01-06T03:37:40Z',
        //     reviewBody: 'This is my favorite product yet! Thanks Nate for the example products and reviews.',
        //     name: 'So awesome!!!',
        //     reviewRating: {
        //       bestRating: '5',
        //       ratingValue: '5',
        //       worstRating: '1',
        //     },
        //     publisher: {
        //       type: 'Organization',
        //       name: 'TwoVit',
        //     },
        //   },
        // ]}
        // aggregateRating={{
        //   ratingValue: '4.4',
        //   reviewCount: '89',
        // }}
        // mpn="925872"
      />
    </>
  );
};

export { ProductSeo };

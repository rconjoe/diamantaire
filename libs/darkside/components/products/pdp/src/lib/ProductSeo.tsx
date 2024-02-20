import { useTranslations } from '@diamantaire/darkside/data/hooks';
import { parseValidLocale } from '@diamantaire/shared/constants';
import { createLongProductTitle, replacePlaceholders } from '@diamantaire/shared/helpers';
import { generateProductUrl } from '@diamantaire/shared-product';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

const ProductSeo = ({ seoFields, legacySeoFields, productType, productTitle, metal, diamondType, canonicalVars }) => {
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
    process.env.VERCEL_ENV === 'production' || process.env.VERCEL_ENV === 'preview'
      ? 'https://www.vrai.com'
      : 'http://localhost:4200';

  return (
    <NextSeo
      title={metaTitle}
      description={metaDescription}
      canonical={baseUrl + seoParam[selectedLanguageCode] + generateProductUrl(productType, collectionSlug, productSlug)}
    />
  );
};

export { ProductSeo };

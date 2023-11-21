import { useTranslations } from '@diamantaire/darkside/data/hooks';
import { parseValidLocale } from '@diamantaire/shared/constants';
import { createLongProductTitle, replacePlaceholders } from '@diamantaire/shared/helpers';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

const ProductSeo = ({ seoFields, legacySeoFields, productType, productTitle, metal, diamondType }) => {
  const { seoTitle, seoDescription } = legacySeoFields || {};
  const { languageCode: selectedLanguageCode } = parseValidLocale(useRouter().locale);
  const { _t } = useTranslations(useRouter().locale);

  const metaTitle =
    // Generate title as fallback for ERs
    seoFields
      ? seoFields.seoTitle
      : productType === 'Engagement Ring'
      ? `${createLongProductTitle({
          title: productTitle,
          diamondType: diamondType,
          productType: productType,
          selectedLanguageCode,
          _t,
          enableMetal: true,
          metal,
        })} | VRAI`
      : seoTitle;

  const metaDescription = seoFields
    ? replacePlaceholders(seoFields?.seoDescription, ['%%product_name%%'], [productTitle]).toString()
    : replacePlaceholders(seoDescription, ['%%product_name%%'], [productTitle]).toString();

  return <NextSeo title={metaTitle} description={metaDescription} />;
};

export { ProductSeo };

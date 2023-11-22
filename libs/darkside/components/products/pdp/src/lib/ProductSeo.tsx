import { useTranslations } from '@diamantaire/darkside/data/hooks';
import { parseValidLocale } from '@diamantaire/shared/constants';
import { createLongProductTitle, replacePlaceholders } from '@diamantaire/shared/helpers';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

const ProductSeo = ({ seoFields, legacySeoFields, productType, productTitle, metal, diamondType }) => {
  const { seoTitle, seoDescription } = legacySeoFields || {};
  const { languageCode: selectedLanguageCode } = parseValidLocale(useRouter().locale);
  const { _t } = useTranslations(useRouter().locale);

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

  return <NextSeo title={metaTitle} description={metaDescription} />;
};

export { ProductSeo };

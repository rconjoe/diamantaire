/* eslint-disable no-await-in-loop */
import fs from 'fs';

import axios, { AxiosResponse } from 'axios';

import { configurationOptionValues, sortConfiguration } from '../utils/configurations';
import 'dotenv/config';

const BASE_URL = 'https://www.vrai.com';

const alternateLocales = ['de-DE', 'es-ES']; // Removed 'fr-FR' for now

/** Types */

type SeoFields = {
  addNoindexNofollow: boolean
}

type StandardPageBrief = {
  slug: string;
  seo: SeoFields | null;
}

type JournalPageBrief = {
  slug: string;
}

type JournalCategoryBrief = {
  key: string;
  subcategories: { key: string }[]
}

type PlpPageBrief = {
  slugNew: string;
  category: string;
  seo: SeoFields | null;
}

type Product = {
  collectionSlug: string;
  productType: string;
  productSlug: string;
  configuration: { 
    metal: string;
    diamondType: string;
  } & Record<string, string>;
}

/** FETCH DATA */

async function datoRequest(query, variables){

  console.log("Making dato request", variables)

  try {
    const response = await axios({
      url: 'https://graphql.datocms.com',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer 7a9eaceb223701945fa52207b67811`,
      },
      data: JSON.stringify({
        query,
        variables,
      }),
    });

    if (response.status === 200) {
      console.log('Successful request');

      return response.data.data;
    } else {
      console.log('Error retrieving data');

      return null;
    }
  } catch (error){
    console.log("Dato request failed:", error);
  }
}

async function getProducts(page = 1) {
  const response = await axios({
    method: 'get',
    url: `http://localhost:3333/v1/products/feed?limit=100&page=${page}`,
    headers: {
      'x-api-key': '9a508cb5bd527bap332330AK1b4bd9b25b9a508cb5',
      'Content-type': 'application/json',
    },
  });

  if (response.status === 200) {
    console.log('Successful request');

    return response.data;
  } else {
    console.log('Error retrieving data');

    return null;
  }
}

async function getAllProducts(){
  let data = [];
  let page = 1;
  let response;

  do{
    console.log(`Requesting page: ${page}`);
    response = await getProducts(page);
    if (response){
      console.log("Response data", response.items.length);
      data = [...data, ...response.items];
    }
    page += 1;
  } while(response.paginator?.hasNextPage);

  return data;
}

async function getAllStandardPageSlugs(): Promise<StandardPageBrief[]>{
  const first = 100;
  let data = [];
  let skip = 0;
  let response: AxiosResponse<{ allStandardPages: StandardPageBrief[] }>;
  const query = `
    query AllStandardPageSlugs($first: IntType, $skip: IntType) {
      allStandardPages(first: $first, skip: $skip) {
        slug
        seo {
          addNoindexNofollow
        }
      }
    }
  `;

  do{
    response = await datoRequest(query, { first, skip });
    if (response){
      data = [...data, ...response['allStandardPages']];
    }
    
    skip += first;
  } while(response['allStandardPages'].length === first);

  return data;
}

async function getAllJournalPageSlugs(){
  const first = 100;
  let data = [];
  let skip = 0;
  let response: AxiosResponse<{ allBlogPosts: JournalPageBrief[] }>;
  const query = `
    query AllJournalPageSlugs($first: IntType, $skip: IntType) {
      allBlogPosts(first: $first, skip: $skip) {
        slug
      }
    }
  `;

  do{
    response = await datoRequest(query, { first, skip });
    if (response){
      data = [...data, ...response['allBlogPosts']];
    }
    
    skip += first;
  } while(response['allBlogPosts'].length === first);

  return data;
}

async function getAllJournalCategorySlugs(){
  const first = 100;
  let data = [];
  let skip = 0;
  let response: AxiosResponse<{ allBlogPosts: JournalCategoryBrief[] }>;
  const query = `
    query AllJournalPageSlugs($first: IntType, $skip: IntType) {
      allBlogCategories(first: $first, skip: $skip) {
        subcategories {
          key
        }
        key
      }
    }
  `;

  do{
    response = await datoRequest(query, { first, skip });
    if (response){
      data = [...data, ...response['allBlogCategories']];
    }
    
    skip += first;
  } while(response['allBlogCategories'].length === first);

  return data;
}

async function getAllPlpPageSlugs(){
  const first = 100;
  let data = [];
  let skip = 0;
  let response: AxiosResponse<{ allListPages: PlpPageBrief[] }>;
  const query = `
    query AllListPageSlugs($first: IntType, $skip: IntType) {
      allListPages(first: $first, skip: $skip) {
        slugNew
        category
        seo {
          addNoindexNofollow
        }
      }
    }
  `;

  do{
    response = await datoRequest(query, { first, skip });
    console.log("list page response", response)
    if (response){
      data = [...data, ...response['allListPages']];
    }
    
    skip += first;
  } while(response['allListPages'].length === first);

  return data;
}

/** GENERATE URLS */

function generateStandardPageSitemapUrls(standardPages: StandardPageBrief[]): string[]{

  const getStandardPageUrl = (slug: string, locale?: string) => {
    return `${BASE_URL}/${locale ? locale + '/' : ''}${slug}`;
  }
  // only pages w/o no index, no follow
  const indexablePages = standardPages.reduce((acc: string[], page) => {
    if(!page.seo?.addNoindexNofollow){
      acc.push(page.slug);
    }

    return acc;
  },[]);

  const urls = indexablePages.map(slug => {
    const alternateLinks = alternateLocales.map(locale => {
      const lang = locale.split('-')[0];
      
      return `<xhtml:link rel="alternate" hreflang="${lang}" href="${getStandardPageUrl(slug, locale)}/" />`
    }).join('');

    return `<url><loc>${getStandardPageUrl(slug)}</loc>${alternateLinks}</url>`;
  });

  return ['<!-- Content Pages -->', ...urls];
}

function generateJournalPageSitemapUrls(journalPages: JournalPageBrief[]): string[]{

  const getJournalPageUrl = (slug: string, locale?: string) => {
    return `${BASE_URL}/${locale ? locale + '/' : ''}journal/post/${slug}`;
  }

  const urls = journalPages.map(page => {
    const url = getJournalPageUrl(page.slug);
    // const alternateLinks = alternateLocales.map(locale => {
    //   const lang = locale.split('-')[0];
      
    //   return `<xhtml:link rel="alternate" hreflang="${lang}" href="${getJournalPageUrl(page.slug, locale)}/" />`
    // }).join('');

    return `<url><loc>${url}</loc></url>`;
  });

  console.log("Journal URLs", urls);

  return ['<!-- Journal Posts -->', ...urls];
}

function generateJournalCategorySitemapUrls(journalCategories: JournalCategoryBrief[]): string[]{
  const getJournalCategoryUrl = (category: string, locale?: string) => {
    return `${BASE_URL}/${locale ? locale + '/' : ''}journal/${category}`;
  };
  const urls = journalCategories.reduce((acc, category) => {
    const path = `journal/${category.key}`;
    const url = getJournalCategoryUrl(path);

    // const alternateLinks = alternateLocales.map(locale => {
    //   const lang = locale.split('-')[0];
      
    //   return `<xhtml:link rel="alternate" hreflang="${lang}" href="${getJournalCategoryUrl(path, locale)}/" />`
    // }).join('');

    // add all category urls
    acc.push(`<url><loc>${url}</loc></url>`);

    // add all subcategory urls
    category.subcategories.forEach(subcategory => {
      const subcategoryPath = `journal/${category.key}/${subcategory.key}`;
      const subcategoryUrl = getJournalCategoryUrl(subcategoryPath);

      const alternateSubcategoryLinks = alternateLocales.map(locale => {
        const lang = locale.split('-')[0];
        
        return `<xhtml:link rel="alternate" hreflang="${lang}" href="${getJournalCategoryUrl(path, locale)}/" />`
      }).join('');

      acc.push(`<url><loc>${subcategoryUrl}</loc>${alternateSubcategoryLinks}</url>`);
    });

    return acc;
  },[])

  console.log("Journal Category URLs", urls);

  return ['<!-- Journal Categories -->', ...urls];
}

function generatePlpPageSitemapUrls(standardPages: PlpPageBrief[]): string[]{

  const getPlpPageUrl = (slug: string, locale?: string) => {
    return `${BASE_URL}/${locale ? locale + '/' : ''}${slug}`;
  }
  // only pages w/o no index, no follow
  const indexablePages = standardPages.reduce((acc: string[], page) => {
    if(!page.seo?.addNoindexNofollow && page.category && page.slugNew){
      acc.push(`${page.category}/${page.slugNew}`);
    }

    return acc;
  },[]);

  const urls = indexablePages.map(slug => {
    const url = getPlpPageUrl(slug);

    const alternateLinks = alternateLocales.map(locale => {
      const lang = locale.split('-')[0];
      
      return `<xhtml:link rel="alternate" hreflang="${lang}" href="${getPlpPageUrl(slug, locale)}/" />`
    }).join('');

    return `<url><loc>${url}</loc>${alternateLinks}</url>`;
  });

  return ['<!-- Product List Pages -->', ...urls];
}

function generatePdpSitemapUrls(allProducts: Product[]){
  const getPdpUrl = (collectionSlug: string, productSlug: string, productType: string, locale?: string) => {
    let type;

    switch(productType){
      case 'Engagement Ring':
        type = 'engagement-ring';
        break;
      case 'Wedding Band':
        type = 'wedding-bands';
        break;
      case 'Earrings':
        type = 'jewelry/earrings';
        break;
      case 'Necklace':
        type = 'jewelry/necklaces';
        break;
      case 'Bracelet':
        type = 'jewelry/bracelets';
        break;
      case 'Ring':
        type = 'jewelry/rings';
        break;
      default:
        type = productType;
    }

    return `${BASE_URL}/${locale ? locale + '/' : ''}${type}/${collectionSlug}/${productSlug}`;
  }
  const collections = allProducts.reduce((acc: Record<string, Product[]>, product) => {
    if (!acc[product.collectionSlug]){
      acc[product.collectionSlug] = [product];
    } else {
      acc[product.collectionSlug].push(product);
    }

    return acc;
  },{});

  Object.entries(collections).forEach(([collectionSlug, products]) => console.log(collectionSlug, products.length))

  const urls = Object.entries(collections).reduce((acc, [collectionSlug, products]) => {
    // console.log("Collection", collectionSlug, products.length);
    const sortedProducts = products.sort(sortConfiguration);

    configurationOptionValues['diamondType'].forEach( diamondType => {
      configurationOptionValues['metal'].forEach( metal => {
        const canonicalProduct = sortedProducts.find(p => (
          p.configuration.diamondType === diamondType &&
          p.configuration.metal === metal 
        ));

        if (canonicalProduct){
          // console.log("Canonical Product", collectionSlug, canonicalProduct.configuration);
          const url = getPdpUrl(collectionSlug, canonicalProduct.productSlug, canonicalProduct.productType);

          const alternateLinks = alternateLocales.map(locale => {
            const lang = locale.split('-')[0];
            
            return `<xhtml:link rel="alternate" hreflang="${lang}" href="${getPdpUrl(collectionSlug, canonicalProduct.productSlug, canonicalProduct.productType, locale)}/" />`
          }).join('');

          acc.push(`<url><loc>${url}</loc>${alternateLinks}</url>`);
        }
      });
    });
 
    return acc;
  }, []);

  console.log("PDP URLs", urls.length);

  return ['<!-- Product Detail Pages -->', ...urls];
}

async function getAllData(){
  // Standard Page slugs
  const standardPagesResponse = await getAllStandardPageSlugs();
  const standardPageUrls = generateStandardPageSitemapUrls(standardPagesResponse);

  // Journal categories and subcategories
  const journalCategoryKeys = await getAllJournalCategorySlugs();
  const journalCategoryUrls = generateJournalCategorySitemapUrls(journalCategoryKeys);
  
  // Journal Pages
  const journalPagesSlugs = await getAllJournalPageSlugs();
  const journalPageUrls = generateJournalPageSitemapUrls(journalPagesSlugs);

  // PLP Pages
  const plpPagesSlugs = await getAllPlpPageSlugs();
  const plpPageUrls = generatePlpPageSitemapUrls(plpPagesSlugs);

  // PDP Pages
  const allProducts = await getAllProducts();
  const pdpUrls = generatePdpSitemapUrls(allProducts);

  const pages = [standardPageUrls.join('\n'), journalCategoryUrls.join('\n'), journalPageUrls.join('\n'), plpPageUrls.join('\n'), pdpUrls.join('\n')].join('\n\n');
  const siteMapData = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n\n${pages}</urlset>`;

  generateXML(siteMapData, './files/sitemap.xml');
}

export async function generateXML(data: string, filename: string) {
  const xmlfile = fs.createWriteStream(filename);

  xmlfile.write(data);
  xmlfile.end();
}

getAllData();

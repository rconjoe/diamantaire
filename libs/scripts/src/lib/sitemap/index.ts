/* eslint-disable no-await-in-loop */
import fs from 'fs';

import axios, { AxiosResponse } from 'axios';

import { configurationOptionValues, sortConfiguration } from '../utils/configurations';
import 'dotenv/config';

const BASE_URL = 'https://www.vrai.com';

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

function generateStandardPageSitemapUrls(standardPages: StandardPageBrief[], locale: string): string[]{
  // only pages w/o no index, no follow
  const indexablePages = standardPages.reduce((acc: string[], page) => {
    if(!page.seo?.addNoindexNofollow){
      acc.push(page.slug);
    }

    return acc;
  },[]);

  return indexablePages.map(slug => {
    const url = `${BASE_URL}/${locale ? locale + '/' : ''}${slug}`;

    return `<url><loc>${url}</loc></url>`;
  })
}

function generateJournalPageSitemapUrls(journalPages: JournalPageBrief[], locale: string): string[]{
  const urls = journalPages.map(page => {
    const url = `${BASE_URL}/${locale ? locale + '/' : ''}journal/post/${page.slug}`;

    return `<url><loc>${url}</loc></url>`;
  });

  console.log("Journal URLs", urls);

  return urls;
}

function generateJournalCategorySitemapUrls(journalCategories: JournalCategoryBrief[], locale: string): string[]{
  const urls = journalCategories.reduce((acc, category) => {
    const path = `journal/${category.key}`;
    const url = `${BASE_URL}/${locale ? locale + '/' : ''}${path}`;

    // add all category urls
    acc.push(`<url><loc>${url}</loc></url>`);

    // add all subcategory urls
    category.subcategories.forEach(subcategory => {
      const subcategoryPath = `journal/${category.key}/${subcategory.key}`;
      const subcategoryUrl = `${BASE_URL}/${locale ? locale + '/' : ''}${subcategoryPath}`;

      acc.push(`<url><loc>${subcategoryUrl}</loc></url>`);
    })

    return acc;
  },[])

  console.log("Journal Category URLs", urls);

  return urls;
}

function generatePlpPageSitemapUrls(standardPages: PlpPageBrief[], locale: string): string[]{
  // only pages w/o no index, no follow
  const indexablePages = standardPages.reduce((acc: string[], page) => {
    if(!page.seo?.addNoindexNofollow && page.category && page.slugNew){
      acc.push(`${page.category}/${page.slugNew}`);
    }

    return acc;
  },[]);

  return indexablePages.map(slug => {
    const url = `${BASE_URL}/${locale ? locale + '/' : ''}${slug}`;

    return `<url><loc>${url}</loc></url>`;
  })
}

function generatePdpSitemapUrls(allProducts: Product[], locale?: string){
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
          const url = `${BASE_URL}/${locale ? locale + '/' : ''}${collectionSlug}/${canonicalProduct.productSlug}`;

          acc.push(`<url><loc>${url}</loc></url>`);
        }
      });
    });
 
    return acc;
  }, []);

  console.log("PDP URLs", urls.length);

  return urls;
}

async function getAllData(locale?: string){
  // Standard Page slugs
  const standardPagesResponse = await getAllStandardPageSlugs();
  const standardPageUrls = generateStandardPageSitemapUrls(standardPagesResponse, locale);

  // Journal categories and subcategories
  const journalCategoryKeys = await getAllJournalCategorySlugs();
  const journalCategoryUrls = generateJournalCategorySitemapUrls(journalCategoryKeys, locale);
  
  // Journal Pages
  const journalPagesSlugs = await getAllJournalPageSlugs();
  const journalPageUrls = generateJournalPageSitemapUrls(journalPagesSlugs, locale);

  // PLP Pages
  const plpPagesSlugs = await getAllPlpPageSlugs();
  const plpPageUrls = generatePlpPageSitemapUrls(plpPagesSlugs, locale);

  // PDP Pages
  const allProducts = await getAllProducts();
  const pdpUrls = generatePdpSitemapUrls(allProducts, locale);

  const pages = [standardPageUrls.join(''), journalCategoryUrls.join(''), journalPageUrls.join(''), plpPageUrls.join(''), pdpUrls.join('')].join('');
  const siteMapData = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages}</urlset>`;

  generateXML(siteMapData, './files/sitemap.xml');
}

export async function generateXML(data: string, filename: string) {
  const xmlfile = fs.createWriteStream(filename);

  xmlfile.write(data);
  xmlfile.end();
}

getAllData();

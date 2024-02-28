// import PageMetaTitleAndDescription from '../document/PageMetaTitleAndDescription';

import { DarksideButton, Heading, ImageTile, UniLink, UIString } from '@diamantaire/darkside/components/common-ui';
import { useJournalConfig } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { parseValidLocale } from '@diamantaire/shared/constants';
import { getRelativeUrl } from '@diamantaire/shared/helpers';
import { useInfiniteQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useState, ReactNode, ReactElement, useEffect } from 'react';

import { JournalCategoryEntryContainer } from './JournalCategoryEntry.style';
import { JournalHeader } from '../general/JournalHeader';
import { generateSubheading } from '../journal-helpers';

type JournalCategoryEntryProps = {
  slug: string;
  activeCategory: {
    subcategories: Array<object>;
  };
  subcategory?: object;
  blogConfiguration: object;
  blogHeader: object;
  categoryPosts: Array<object>;
  locale: string;
  count: number;
  getTemplate?: (page: ReactElement | ReactElement[]) => ReactNode[];
  parentCategorySlug: string;
  isSubCategory: boolean;
};

const JournalCategoryEntry = (props: JournalCategoryEntryProps) => {
  const { slug, locale, isSubCategory, parentCategorySlug } = props;
  const { data: { blogConfiguration } = {} } = useJournalConfig(locale);

  const { categoriesToDisplay, postsPerPage } = blogConfiguration || {};

  const [latestJournalsIndex, setLatestJournalsIndex] = useState(postsPerPage);
  const [init, setInit] = useState(false);
  const [count, setCount] = useState(0);

  const router = useRouter();

  const parentCategory = categoriesToDisplay?.filter((cat) => cat.key === parentCategorySlug)?.[0];

  const activeCategory = categoriesToDisplay?.filter((cat) => cat.key === slug)?.[0];

  const { subcategories: _subcategories, route } = activeCategory || {};

  const catQueryParams = {
    ...queries.journal.journalsByCategory(locale, activeCategory?.id, postsPerPage, !init ? 0 : latestJournalsIndex),
  };

  const { data, fetchNextPage, refetch, remove } = useInfiniteQuery(catQueryParams);

  const [categoryPosts, setCategoryPosts] = useState(data?.pages?.map((page) => page?.allBlogPosts?.map((post) => post))[0]);

  function handleLoadMore() {
    setLatestJournalsIndex(latestJournalsIndex + postsPerPage);
    setInit(true);
  }

  const { seoTitle, seoDescription } = isSubCategory ? activeCategory : parentCategory || {};

  const subcategories = [{ key: 'all', copy: `all ${parentCategory?.copy}`, route }, ...(_subcategories || [])];

  const crumbs = [
    {
      key: 'home',
      copy: 'Home',
      path: '/',
    },
    {
      key: 'journal',
      copy: 'Journal',
      path: '/journal',
    },
    {
      key: slug,
      copy: activeCategory?.copy,
      path: router?.asPath,
    },
  ];

  useEffect(() => {
    const categoryJournalsTemp = [];

    if (!data?.pages) return;

    data?.pages?.map((page) => {
      setCount(page?._allBlogPostsMeta?.count);

      return page?.allBlogPosts?.map((post) => categoryJournalsTemp.push(post));
    });

    setCategoryPosts(categoryJournalsTemp);
  }, [data]);

  useEffect(() => {
    remove();
    setInit(false);
    setLatestJournalsIndex(0);
    refetch();
  }, [isSubCategory, activeCategory?.id, slug]);

  useEffect(() => {
    if (init) {
      fetchNextPage({
        pageParam: latestJournalsIndex,
      });
      setInit(false);
    }
  }, [init]);

  const { asPath } = useRouter();

  const seoParam = {
    en: '',
    es: '/en-ES/',
    fr: '/fr-FR/',
    de: '/de-DE/',
  };

  const { languageCode } = parseValidLocale(locale);

  const baseUrl =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' || process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? 'https://www.vrai.com'
      : 'http://localhost:4200';

  return (
    <JournalCategoryEntryContainer>
      {seoTitle && seoDescription && (
        <NextSeo title={seoTitle} description={seoDescription} canonical={baseUrl + seoParam[languageCode] + asPath} />
      )}

      <JournalHeader showTitle={false} showNavLogo={true} categoriesToDisplay={blogConfiguration?.categoriesToDisplay} />

      <div className="breadcrumbs">
        <ul className="list-unstyled flex">
          {crumbs?.map(({ copy, path }, i) => {
            return (
              <li key={i}>
                <UniLink className={i === crumbs.length - 1 ? 'bold' : ''} route={path}>
                  <UIString>{copy}</UIString>
                </UniLink>
                {i !== crumbs.length - 1 && <span>/</span>}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="journal-category__wrapper">
        <div className="journal-category__page-title">
          <Heading type="h1" className="journal-category__page-heading">
            <UIString>{activeCategory?.copy}</UIString>
          </Heading>
        </div>
        <div className={'journal-category__wrapper blog-category'}>
          {/* TODO: this (and a couple other sections) should be in their own component: */}
          <div className="journal-category__subnav">
            {subcategories?.length > 1 &&
              subcategories?.map((s, i) => {
                const isActive = asPath === getRelativeUrl(s.route);

                return (
                  <UniLink key={i} route={getRelativeUrl(s.route)}>
                    <span
                      key={i}
                      className={clsx('journal-category__subnav-link', {
                        active: isActive,
                      })}
                    >
                      {s.copy}
                    </span>
                  </UniLink>
                );
              })}
          </div>
        </div>

        <div className="container-wrapper with-route">
          <div className="journal-category__content-block-container">
            {categoryPosts?.map((p, i) => (
              <ImageTile
                key={i}
                forceAspectRatio={true}
                subtitle={generateSubheading(p)}
                {...p}
                copy={p?.excerpt}
                ctaCopy="Read More"
                ctaRoute={`/journal/post/${p?.slug}`}
                image={p?.featuredImage}
                extraClass="journal-item"
              />
            ))}
          </div>
          <div className="journal-category__load-more-button">
            {count > categoryPosts?.length && (
              <DarksideButton onClick={() => handleLoadMore()} type="outline">
                <UIString>Load more</UIString>
              </DarksideButton>
            )}
          </div>
        </div>
      </div>
    </JournalCategoryEntryContainer>
  );
};

JournalCategoryEntry.getTemplate = getStandardTemplate;

export { JournalCategoryEntry };

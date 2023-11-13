import { DarksideButton, Heading, ImageTile, UIString, UniLink } from '@diamantaire/darkside/components/common-ui';
import { useJournalConfig, useJournalSubcategory } from '@diamantaire/darkside/data/hooks';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { getRelativeUrl } from '@diamantaire/shared/helpers';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useState, ReactNode, ReactElement, useEffect } from 'react';

import { JournalCategoryEntryContainer } from './JournalCategoryEntry.style';
import { JournalHeader } from '../general/JournalHeader';
import { generateSubheading } from '../journal-helpers';

type JournalSubCategoryEntryProps = {
  slug: string;
  activeCategory: object;
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

const JournalSubCategoryEntry = ({ slug, locale, isSubCategory, parentCategorySlug }: JournalSubCategoryEntryProps) => {
  const { data: { blogConfiguration } = {} } = useJournalConfig(locale);

  const { categoriesToDisplay, postsPerPage } = blogConfiguration || {};

  // const [categoryPosts, setCategoryPosts] = useState([]);
  const [latestJournalsIndex, setLatestJournalsIndex] = useState(0);
  const [infiniteQueryPag, setInfiniteQueryPag] = useState(0);
  const [init, setInit] = useState(false);
  const [count, setCount] = useState(0);

  const router = useRouter();

  const parentCategory = categoriesToDisplay?.filter((cat) => cat.key === parentCategorySlug)?.[0];

  const subCategory = parentCategory?.subcategories?.filter((subcat) => subcat.key === slug)?.[0];

  const { subcategories: _subcategories, route } = parentCategory || {};

  const { data, fetchNextPage, refetch, remove } = useJournalSubcategory(
    locale,
    parentCategory.id,
    subCategory?.id,
    postsPerPage,
    !init ? 0 : infiniteQueryPag,
  );

  const [categoryPosts, setCategoryPosts] = useState(data?.pages?.map((page) => page.allBlogPosts).flat());

  async function handleLoadMore() {
    const infinitePagTemp = infiniteQueryPag + postsPerPage;
    const newJournalIndexTemp = latestJournalsIndex + postsPerPage;

    setInfiniteQueryPag(infinitePagTemp);
    setLatestJournalsIndex(newJournalIndexTemp);
    refetch();
    setInit(true);
  }

  const { seoTitle, seoDescription } = subCategory || {};

  const subcategories = [{ key: 'all', copy: `all ${parentCategory?.copy}`, route }, ...(_subcategories || [])];

  const crumbs = [
    {
      key: 'home',
      copy: 'Home',
      path: 'https://www.vrai.com/',
    },
    {
      key: 'journal',
      copy: 'Journal',
      path: 'https://www.vrai.com/journal',
    },
    {
      key: slug,
      copy: subCategory?.copy,
      path: router.asPath,
    },
  ];

  useEffect(() => {
    const categoryJournalsTemp = [];

    if (!data) return;

    data?.pages?.map((page) => {
      setCount(page?._allBlogPostsMeta?.count - 1);

      return page?.allBlogPosts?.map((post) => categoryJournalsTemp.push(post));
    });

    setCategoryPosts(categoryJournalsTemp);
  }, [data]);

  useEffect(() => {
    // Fetch the data for the current page number
    fetchNextPage();
  }, [infiniteQueryPag]);

  useEffect(() => {
    setInit(false);
    remove();
    setLatestJournalsIndex(0);
    setInfiniteQueryPag(0);
    refetch();
  }, [isSubCategory, subCategory?.id, slug]);

  useEffect(() => {
    if (init) {
      fetchNextPage({
        pageParam: 0,
      });
      setInit(false);
    }
  }, [init]);

  const { asPath } = useRouter();

  return (
    <JournalCategoryEntryContainer>
      {seoTitle && seoDescription && <NextSeo title={seoTitle} description={seoDescription} />}

      <JournalHeader showTitle={false} showNavLogo={true} categoriesToDisplay={blogConfiguration?.categoriesToDisplay} />

      <div className="breadcrumbs">
        <ul className="list-unstyled flex">
          {crumbs.map(({ copy, path }, i) => {
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
            <UIString>{subCategory?.copy}</UIString>
          </Heading>
        </div>
        <div className={'journal-category__wrapper blog-category'}>
          <div className="journal-category__subnav">
            {subcategories.length > 1 &&
              subcategories.map((s, i) => {
                const isActive = asPath === getRelativeUrl(s.route, '/journal');

                return (
                  <UniLink key={i} route={getRelativeUrl(s.route, '/journal')}>
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
            {categoryPosts.map((p, i) => (
              <ImageTile
                key={i}
                forceAspectRatio={true}
                subtitle={generateSubheading(p)}
                {...p}
                copy={p?.excerpt}
                ctaCopy="Read More"
                ctaRoute={`/post/${p?.slug}`}
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

JournalSubCategoryEntry.getTemplate = getStandardTemplate;

export { JournalSubCategoryEntry };

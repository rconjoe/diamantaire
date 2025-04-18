import { ImageTile, Heading, DarksideButton, UIString } from '@diamantaire/darkside/components/common-ui';
import { parseValidLocale } from '@diamantaire/shared/constants';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import { JournalCategoryGridGroup } from './JournalCategoryGridGroup';
import { JournalHomeEntryStyles } from './JournalHomeEntry.style';
import JournalFeaturedArticle from '../general/JournalFeaturedArticle';
import { JournalHeader } from '../general/JournalHeader';
import { generateSubheading } from '../journal-helpers';

const JournalHomeEntry = ({
  blogConfiguration,
  blogHomeSeo,
  latestJournals,
  categoriesToDisplay,
  heroPost,
  latestStoriesTitle,
  postsPerPage,
  fetchNextPage,
  setLatestJournalsIndex,
  latestJournalsIndex,
}) => {
  async function handleLoadMore() {
    setLatestJournalsIndex(latestJournalsIndex + postsPerPage);
    fetchNextPage({
      options: {
        cancelRefetch: false,
      },
    });
  }

  const { title: heroPostTitle, slug, excerpt, _publishedAt, _updatedAt, featuredImage } = heroPost || {};

  const refinedHeroPost = {
    ...heroPost,
    ctaCopy: 'Read more',
    ctaRoute: slug,
    desktopCopy: excerpt,
    desktopImage: featuredImage,
    isFullWidth: false,
    isTextBlockWide: false,
    textBlockAlignment: 'right',
    textColor: '#000000',
    title: heroPostTitle,
    mobileCopy: excerpt,
    mobileImage: featuredImage,
    mobileTitle: heroPostTitle,
    publishedAt: _publishedAt,
    updatedAt: _updatedAt,
  };

  const { asPath, locale } = useRouter();

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
    <JournalHomeEntryStyles>
      <NextSeo
        title={blogHomeSeo?.seoTitle}
        description={blogHomeSeo?.seoDescription}
        canonical={baseUrl + seoParam[languageCode] + asPath}
      />
      <JournalHeader showTitle={true} showNavLogo={false} categoriesToDisplay={blogConfiguration?.categoriesToDisplay} />
      <div className="journal-container">
        {/* ------ LATEST STORIES list title block ------ */}
        <div className="journal-home__wrapper header-content">
          <div className="container-wrapper">
            <Heading type="h2" className="h1 journal-home__title">
              {latestStoriesTitle}
            </Heading>
            <hr />
          </div>
        </div>

        {/* ------ heroPost banner block ------- */}
        <div className="journal-home__wrapper">
          {/* <BannerBlock {...refinedHeroPost} subTitle={generateSubheading(heroPost)} subtitleAdditionalClass={'-blog'} /> */}
          <JournalFeaturedArticle
            {...refinedHeroPost}
            // subTitle={generateSubheading(heroPost)}
            subtitleAdditionalClass={'-blog'}
          />
        </div>

        {/* ------ latest stories trio ------ */}
        <div className="container-wrapper with-route">
          <div className="journal-home__content-block-container">
            {latestJournals.map((post, index) => {
              // image
              post.image = {};
              post.image.url = post.featuredImage.url;

              // link
              post.ctaRoute = '/journal/post/' + post.slug;
              post.ctaCopy = 'Read More';
              post.copy = post.excerpt;

              return (
                <ImageTile
                  key={index}
                  forceAspectRatio={true}
                  subtitle={generateSubheading(post)}
                  {...post}
                  extraClass="journal-item"
                />
              );
            })}
          </div>
          <div className="journal-home__load-more-button">
            <DarksideButton onClick={() => handleLoadMore()} type="outline">
              <UIString>Load more</UIString>
            </DarksideButton>
          </div>
        </div>

        {/* ------ map category groups ------ */}
        {categoriesToDisplay?.map((category, i) => {
          return <JournalCategoryGridGroup category={category} key={`journal-cat-grid-${i}`} />;
        })}
      </div>
    </JournalHomeEntryStyles>
  );
};

export { JournalHomeEntry };

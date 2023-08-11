import { Heading, MobileDesktopImage, VRAIButton } from '@diamantaire/darkside/components/common-ui';
import { DatoImageType } from '@diamantaire/shared/types';
import { media } from '@diamantaire/styles/darkside-styles';
import { format } from 'date-fns';
import styled from 'styled-components';

type JournalFeaturedArticleProps = {
  author: string;
  ctaCopy: string;
  ctaRoute: string;
  desktopCopy: string;
  desktopImage: DatoImageType;
  excerpt: string;
  featuredImage: DatoImageType;
  id: string;
  isFullWidth: boolean;
  isTextBlockWide: boolean;
  mobileCopy: string;
  mobileImage: DatoImageType;
  mobileTitle: string;
  publishedAt: string;
  seoDescription: string;
  seoTitle: string;
  slug: string;
  sortByDate: string;
  subtitleAdditionalClass: string;
  textBlockAlignment: string;
  textColor: string;
  title: string;
  updatedAt: string;
  _publishedAt: string;
  _updatedAt: string;
};

const JournalFeaturedArticleStyles = styled.div`
  padding-bottom: 20px;
  .featured-article__inner {
    border: 1px solid #ccc;
    ${media.medium`display: flex; border: none;`}
    .featured-article__image {
      flex: 2;
    }
    .featured-article__content {
      flex: 1.5;
      display: flex;
      align-items: center;
      ${media.large`flex: 1;`}

      .featured-article__content-inner {
        position: relative;
        background-color: #fff;
        padding: 20px;
        ${media.medium`left: -100px;padding: 40px;`}

        .featured-article__title {
          font-size: 3rem;
          line-height: 1.3;

          ${media.large`font-size: 4.2rem;`}
        }

        p {
          margin: calc(var(--gutter) / 4) 0 calc(var(--gutter) / 4);

          &.date {
            color: var(--color-teal);
            margin: calc(var(--gutter) / 4) 0 0;
          }
        }
      }
    }
  }
`;

const JournalFeaturedArticle = (props: JournalFeaturedArticleProps) => {
  const { desktopImage, mobileImage, title, desktopCopy, ctaCopy, ctaRoute, sortByDate, author } = props;

  return (
    <JournalFeaturedArticleStyles className="container-wrapper">
      <div className="featured-article__inner">
        <div className="featured-article__image">
          <MobileDesktopImage desktopImage={desktopImage} mobileImage={mobileImage} alt={title} />
        </div>
        <div className="featured-article__content">
          <div className="featured-article__content-inner">
            <Heading type="h3" className="h1 primary featured-article__title">
              {title}
            </Heading>
            <p className="date">
              {author} | {format(new Date(sortByDate), 'MMMM do, yyyy')}
            </p>
            <p>{desktopCopy}</p>
            <VRAIButton isLink={true} href={ctaRoute} type="secondary" colorTheme="teal">
              {ctaCopy}
            </VRAIButton>
          </div>
        </div>
      </div>
    </JournalFeaturedArticleStyles>
  );
};

export default JournalFeaturedArticle;

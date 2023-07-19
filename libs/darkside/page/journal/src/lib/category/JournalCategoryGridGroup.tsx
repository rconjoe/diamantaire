import { ImageTile, Heading } from '@diamantaire/darkside/components/common-ui';
import { UniLink } from '@diamantaire/darkside/core';
import { useJournalsByCategory } from '@diamantaire/darkside/data/hooks';
import { generateSubheading } from '@diamantaire/shared/helpers';
import { useEffect } from 'react';

import { JournalCategoryGridGroupStyles } from './JournalCategoryGridGroup.style';

function JournalCategoryGridGroup({ category }) {
  const catId = category.id;

  const { data, refetch } = useJournalsByCategory('en_US', catId, 3, 0);

  const categorizedPosts = data?.allBlogPosts?.map((post) => post);

  useEffect(() => {
    refetch();
  }, [category]);

  return (
    <JournalCategoryGridGroupStyles className={'container-wrapper with-route'}>
      <div className="journal-category-grid__wrapper header-content">
        <Heading type="h2" className="h1 journal-category-grid__title">
          {category.copy}
        </Heading>
        <div className="journal-category-grid__link-container">
          <UniLink route={category.route}>View all</UniLink>
        </div>
        <hr />
      </div>

      <div className="journal-category-grid__content-block-container">
        {categorizedPosts?.map((post, i) => {
          // image
          post.image = post.featuredImage;
          post.ctaRoute = '/post/' + post.slug;
          post.ctaCopy = 'Learn More';
          post.copy = post.excerpt;

          return <ImageTile key={i} forceAspectRatio={true} {...post} subtitle={generateSubheading(post)} />;
        })}
      </div>
    </JournalCategoryGridGroupStyles>
  );
}

export { JournalCategoryGridGroup };

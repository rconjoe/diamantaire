import { DateTime } from 'luxon';

const generateSubheading = (post) => {
  const date = post.sortByDate;
  const author = post.author || 'VRAI';
  const formattedDate = DateTime.fromISO(date).toLocaleString(
    DateTime.DATE_FULL
  );
  const subheading = `${author} | ${formattedDate}`;

  return subheading;
};

const appendSubheadingToPostContent = (post, idx, keys) => {
  const { content } = post;
  let block = content[idx];
  const subheading = generateSubheading(post);

  keys.map((k) => (block[k] = subheading));

  return block;
};

export { generateSubheading, appendSubheadingToPostContent };

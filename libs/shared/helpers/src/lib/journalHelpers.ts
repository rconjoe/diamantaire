import { format, parseISO } from 'date-fns';

const generateSubheading = (post) => {
  const date = post.sortByDate;

  const dateObject = parseISO(date);

  if (dateObject.toString() === 'Invalid Date') {
    return date;
  }

  const author = post.author || 'VRAI';
  const formattedDate = format(dateObject, 'MMMM dd, yyyy');
  const subheading = `${author} | ${formattedDate}`;

  return subheading;
};

const appendSubheadingToPostContent = (post, idx, keys) => {
  const { content } = post;
  const block = content[idx];
  const subheading = generateSubheading(post);

  keys.map((k) => (block[k] = subheading));

  return block;
};

export { generateSubheading, appendSubheadingToPostContent };

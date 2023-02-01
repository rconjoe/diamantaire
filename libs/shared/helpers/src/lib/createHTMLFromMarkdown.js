import snarkdown from 'snarkdown';

const createHTMLFromMarkdown = markdownContent => {
  const html = snarkdown(markdownContent);

  return { __html: html };
};

export default createHTMLFromMarkdown;

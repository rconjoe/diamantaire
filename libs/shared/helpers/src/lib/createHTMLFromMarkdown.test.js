import { createHTMLFromMarkdown } from './';

describe('createHTMLFromMarkdown', () => {
  it('returns html from markdown in the correct structure', () => {
    const markdownString = `It's very easy to make some words **bold** and other words *italic* with Markdown. You can even [link to Google!](http://google.com)`;
    const actual = createHTMLFromMarkdown(markdownString);
    const expectedHTML =
      'It\'s very easy to make some words <strong>bold</strong> and other words <em>italic</em> with Markdown. You can even <a href="http://google.com">link to Google!</a>';

    expect(actual).toEqual({ __html: expectedHTML });
  });
});

// TODO: Replace with Next SEO
import Markdown from 'markdown-to-jsx';
import Head from 'next/head';
import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server';

const propTypes = {
  questionAnswerData: PropTypes.array,
};

const convertMarkdownToHtmlString = (markdownCopy) => ReactDOMServer.renderToString(<Markdown>{markdownCopy}</Markdown>);

const FAQSchema = ({ questionAnswerData }) => {
  // just need to trigger a rebuild....

  const mainEntity = questionAnswerData.map((data) => {
    return {
      '@type': 'Question',
      name: data.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: convertMarkdownToHtmlString(data.answer),
      },
    };
  });

  const schemaJSONData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `\n${JSON.stringify(schemaJSONData, null, 2)}\n`,
        }}
      />
    </Head>
  );
};

FAQSchema.propTypes = propTypes;

export default FAQSchema;

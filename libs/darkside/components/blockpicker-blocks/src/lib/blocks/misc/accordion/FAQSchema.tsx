// TODO: Replace with Next SEO we encounter actually using this on a page
import Markdown from 'markdown-to-jsx';
import Head from 'next/head';
import ReactDOMServer from 'react-dom/server';

type FAQSchemaProps = {
  questionAnswerData: Array<{
    question: string;
    answer: string;
  }>;
};

const convertMarkdownToHtmlString = (markdownCopy) => ReactDOMServer.renderToString(<Markdown>{markdownCopy}</Markdown>);

const FAQSchema = ({ questionAnswerData }: FAQSchemaProps) => {
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

export default FAQSchema;

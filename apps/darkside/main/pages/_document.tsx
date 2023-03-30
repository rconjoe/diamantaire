import Document, { Html, Main, NextScript, DocumentContext, Head, DocumentInitialProps } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

interface MyDocumentInitialProps extends DocumentInitialProps {
  scrollToTop: boolean;
}

export default class MyDocument extends Document<MyDocumentInitialProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<MyDocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        scrollToTop: true,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          {this.props.scrollToTop && <script dangerouslySetInnerHTML={{ __html: `window.scrollTo(0, 0)` }} />}
        </body>
      </Html>
    );
  }
}

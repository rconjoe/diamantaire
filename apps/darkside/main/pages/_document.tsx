import Document, { Html, Main, NextScript, DocumentContext, Head } from 'next/document';
import Script from 'next/script';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
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
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <Script id="rudderstack-js" strategy="beforeInteractive">
            {`!function(){"use strict";var sdkBaseUrl="https://cdn.rudderlabs.com/beta/3.0.0-beta";var sdkName="rsa.min.js"
;var asyncScript=true;window.rudderAnalyticsBuildType="legacy",window.rudderanalytics=[]
;var e=["setDefaultInstanceKey","load","ready","page","track","identify","alias","group","reset","setAnonymousId","startSession","endSession"]
;for(var n=0;n<e.length;n++){var d=e[n];window.rudderanalytics[d]=function(e){return function(){
window.rudderanalytics.push([e].concat(Array.prototype.slice.call(arguments)))}}(d)}try{
new Function('return import("")'),window.rudderAnalyticsBuildType="modern"}catch(a){}
if(window.rudderAnalyticsMount=function(){var e=document.createElement("script")
;e.src="".concat(sdkBaseUrl,"/").concat(window.rudderAnalyticsBuildType,"/").concat(sdkName),e.async=asyncScript,
document.head?document.head.appendChild(e):document.body.appendChild(e)},"undefined"==typeof Promise){
var t=document.createElement("script")
;t.src="https://polyfill.io/v3/polyfill.min.js?features=globalThis%2CPromise&callback=rudderAnalyticsMount",
t.async=asyncScript,document.head?document.head.appendChild(t):document.body.appendChild(t)}else{
window.rudderAnalyticsMount()}window.rudderanalytics.load("2UAYRK0ZoTfyotdORlAATyZugQ3","https://dfvodevspwfsas.dataplane.rudderstack.com",{})}();
`}
          </Script>
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

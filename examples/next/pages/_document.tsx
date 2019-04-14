import * as React from "react";
import NextDocument, {
  Head,
  Main,
  NextScript,
  NextDocumentContext
} from "next/document";

class Document extends NextDocument {
  public static async getInitialProps(ctx: NextDocumentContext) {
    const initialProps: any = await NextDocument.getInitialProps(ctx);
    return { ...initialProps };
  }

  public render() {
    return (
      <html>
        <Head>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossOrigin="anonymous"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default Document;

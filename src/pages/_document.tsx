import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="TR">
      <Head>
        <meta
          httpEquiv="content-type"
          content="text/html; charset=x-mac-turkish<code>"
        />
        <meta
          httpEquiv="content-type"
          content="text/html; charset=iso-8859-9"
        />
        <meta
          httpEquiv="content-type"
          content="text/html; charset=windows-1254"
        ></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

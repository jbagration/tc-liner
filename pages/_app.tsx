import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Общие мета-теги */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />

        {/* Мета-теги для SEO */}
        <meta name="description" content="Описание сайта" />
        <meta name="keywords" content="Ключевые слова" />
        <meta name="author" content="ТЦ Лайнер - WTS - dev" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

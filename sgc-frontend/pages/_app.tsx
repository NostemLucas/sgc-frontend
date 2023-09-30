import Head from 'next/head'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ComponentBar from '@/components/navigation/ComponentBar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>SIGECOM</title>
        <meta name="description" content="UTIC" />
        <link rel="icon" href="/favicon.ico" />

      </Head>
      <ComponentBar>
        <Component {...pageProps} />
      </ComponentBar>
    </>
  );
}
export default MyApp

import type { AppProps } from 'next/app'
import '../styles/globals.css'
import '../styles/github-dark-dimmed.min.css'
import { Layout } from '/wrappers'

export default function App({ Component, pageProps }: AppProps) {
  return <Layout>
    <Component {...pageProps} />
  </Layout>
}

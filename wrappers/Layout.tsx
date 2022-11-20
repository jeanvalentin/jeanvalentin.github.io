import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, ReactNode } from "react";
import ArticleLayout from "./ArticleLayout";

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const Sublayout = router.asPath.startsWith('/mdx/') ? ArticleLayout : Fragment;

  return <>
    <Head>
      <title>Home page</title>
      <meta name="description" content="Jean Valentin's articles about JavaScript, Node.js, Next.js, and other IT-related topics" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
    <header>
      <Link href='/'>jeanvalentin.github.io</Link>
    </header>
    <main>
      <Sublayout>
        {children}
      </Sublayout>
    </main>
    <footer></footer>
  </>
}

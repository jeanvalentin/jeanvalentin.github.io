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
    </Head>
    <header>
      <Link href='/'>jeanvalentin.github.io</Link>
      <hr />
    </header>
    <main>
      <Sublayout>
        {children}
      </Sublayout>
    </main>
    <footer></footer>
  </>
}

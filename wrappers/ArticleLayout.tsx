import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { getMetaByPath } from "/config/meta";

export default function ArticleLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const meta = getMetaByPath(router.asPath);
  if (!meta) return null;

  return <>
    <Head>
      <title>{meta.title}</title>
    </Head>
    <article>
      <header>
        <time dateTime={meta.date}>{meta.date}</time>
        <h1>{meta.title}</h1>
      </header>
      {children}
      <footer>
        <Link href='/'>← Back to home page</Link>
      </footer>
    </article>
  </>
}

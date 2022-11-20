import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";
import { getMetaBySlug } from "/config/meta";

type Props = {
  children: ReactNode,
  slug: string,
};

export default function ArticleLayout({ children, slug }: Props) {
  const meta = getMetaBySlug(slug);
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

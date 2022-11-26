import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { getMetaByPath } from "/config/meta";
import ccby from "/public/ccby.png";

export default function ArticleLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const meta = getMetaByPath(router.asPath);
  if (!meta) return null;

  return <>
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.title} />
    </Head>
    <article>
      <header>
        <time dateTime={meta.date}>{meta.date}</time>
        <h1>{meta.title}</h1>
      </header>
      <div className="markdown">
        {children}
      </div>
      <footer style={{ display: 'flex' }}>
        <Link href='/'>← Back to home page</Link>
        <span style={{ flex: 'auto' }} />
        <Link rel="license noreferrer noopener" href="http://creativecommons.org/licenses/by/4.0/" target="_blank">
          <Image alt="Creative Commons License" src={ccby} />
        </Link>
      </footer>
    </article>
  </>
}

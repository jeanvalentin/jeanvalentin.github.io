import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <>
    <Head>
      <title>Home page</title>
    </Head>
    <header>
      <Link href='/'>jeanvalentin.github.io</Link>
      <hr />
    </header>
    <main>{children}</main>
    <footer></footer>
  </>
}

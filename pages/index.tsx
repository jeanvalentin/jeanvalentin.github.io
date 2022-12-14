import Head from "next/head";
import Link from "next/link";
import { metas } from "/config/meta";

export default function Home() {
  return <>
    <Head>
      <meta name="description" content={metas.map(v => v.title).join(', ')} />
    </Head>
    <h1>Publications</h1>
    <table>
      <tbody>
        {metas.sort((a, b) => a.date < b.date ? 1 : -1).map(v => <tr key={v.path}>
          <td><strong>{v.date}</strong></td>
          <td><Link href={v.path}>{v.title}</Link></td>
        </tr>)}
      </tbody>
    </table>
  </>
}

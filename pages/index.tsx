import Link from "next/link";
import { metas } from "/config/meta";

export default function Home() {
  return <table>
    <tbody>
      {metas.sort((a, b) => a.date < b.date ? 1 : -1).map(v => <tr key={v.slug}>
        <td><strong>{v.date}</strong></td>
        <td><Link href={`/mdx/${v.slug}`}>{v.title}</Link></td>
      </tr>)}
    </tbody>
  </table>
}

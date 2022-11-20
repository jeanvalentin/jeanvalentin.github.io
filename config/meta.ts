export type Meta = {
  slug: string,
  title: string,
  date: string,
};

export const metas: Meta[] = [
  {
    slug: 'nextjs-cpanel',
    title: `Deploy a Next.js app to cPanel`,
    date: '2022-11-11',
  },
  {
    slug: 'newrelease-cpanel',
    title: `Release a new version of a JavaScript application to cPanel`,
    date: '2022-11-13',
  },
  {
    slug: 'node-db2',
    title: `Connect to a DB2 instance with Node.js`,
    date: '2022-11-20',
  },
];

export const getMetaBySlug = (slug: string) => metas.find(v => v.slug === slug);

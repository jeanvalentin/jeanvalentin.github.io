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
];

export const getMetaBySlug = (slug: string) => metas.find(v => v.slug === slug);

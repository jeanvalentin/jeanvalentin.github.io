export type Meta = {
  path: string,
  title: string,
  date: string,
};

export const metas: Meta[] = [
  {
    path: '/mdx/nextjs-cpanel',
    title: `Deploy a Next.js app to cPanel`,
    date: '2022-11-11',
  },
  {
    path: '/mdx/newrelease-cpanel',
    title: `Release a new version of a JavaScript application to cPanel`,
    date: '2022-11-13',
  },
  {
    path: '/mdx/node-db2',
    title: `Connect to a DB2 instance with Node.js`,
    date: '2022-11-20',
  },
  {
    path: '/mdx/windows-package-manager',
    title: `Package managers: bringing the best of Linux to Windows`,
    date: '2022-11-26',
  },
];

export const getMetaByPath = (path: string) => metas.find(v => v.path === path);

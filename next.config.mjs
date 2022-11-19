/**
* @type {import('next').NextConfig}
*/
import mdx from '@next/mdx';

const withMdx = mdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: 'akamai',
    path: '.',
  },
  assetPrefix: './',
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
};

export default withMdx(nextConfig);

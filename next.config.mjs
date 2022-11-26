/**
* @type {import('next').NextConfig}
*/
import mdx from '@next/mdx';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

const withMdx = mdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  },
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
};

export default withMdx(nextConfig);

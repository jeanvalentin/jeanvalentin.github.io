import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

export default function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy({
		"src/public/": "/",
	});

	eleventyConfig.addExtension("md", {
		compile: inputContent => _ => unified()
			.use(remarkParse)
			.use(remarkGfm)
			.use(remarkRehype, { allowDangerousHtml: true })
			.use(rehypeStringify, { allowDangerousHtml: true })
			.use(rehypeHighlight)
			.process(inputContent),
	});

	return {
		dir: {
			input: "src",
			output: "_site",
		},
	};
};

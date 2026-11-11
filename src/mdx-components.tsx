import type { MDXComponents } from "mdx/types";

// Markdown -> plain-letter elements. h1/h2/p/a are styled by `.letter` in
// globals.css; Tailwind's reset strips lists, quotes and images, so those
// are put back here.
const components: MDXComponents = {
  ul: (props) => <ul className="mb-3.5 list-disc pl-6" {...props} />,
  ol: (props) => <ol className="mb-3.5 list-decimal pl-6" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="mb-3.5 border-l border-[var(--rule)] pl-4 italic"
      {...props}
    />
  ),
  // biome-ignore lint/performance/noImgElement: static hand-drawn diagram, no pipeline needed
  img: (props) => <img className="my-4 h-auto max-w-full" alt="" {...props} />,
  hr: () => <hr className="my-8 border-[var(--rule)]" />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}

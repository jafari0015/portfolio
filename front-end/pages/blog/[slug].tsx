import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { client } from "@/libs/sanity";
import { PortableText, PortableTextComponents } from "@portabletext/react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark";
import duotoneLight from "react-syntax-highlighter/dist/esm/styles/prism/duotone-light";
import Background from "@/components/Background/Background";
import { IoIosArrowBack } from "react-icons/io";

const darkTheme: any = oneDark;
const lightTheme: any = duotoneLight;

export default function BlogDetail({ blog }: { blog: any }) {
  if (!blog) return <p>Not found</p>;

  const components: PortableTextComponents = {
    types: {
      image: ({ value }) => (
        <div className="my-8 flex justify-center">
          <Image
            src={value.asset.url}
            alt={value.alt || "Blog image"}
            width={900}
            height={400}
            className="rounded-xl shadow-lg max-h-[500px] object-cover"
          />
        </div>
      ),
      code: ({ value }) => (
        <div className="my-8 overflow-hidden rounded-xl shadow-lg border border-gray-700/20">
          {value.filename && (
            <div className="bg-gray-800 text-gray-200 px-4 py-2 text-sm font-mono">
              {value.filename}
            </div>
          )}
          <SyntaxHighlighter
            language={value.language || "javascript"}
            style={oneDark}
            customStyle={{
              margin: 0,
              padding: "1rem",
              fontSize: "0.9rem",
            }}
          >
            {value.code}
          </SyntaxHighlighter>
        </div>
      ),
    },
    block: {
      h1: ({ children }) => (
        <h1 className="text-4xl md:text-5xl font-extrabold mt-10 mb-6 leading-tight text-gray-900 dark:text-white">
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-3xl md:text-4xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-2xl font-semibold mt-6 mb-3 text-gray-700 dark:text-gray-300">
          {children}
        </h3>
      ),
      normal: ({ children }) => (
        <p className="text-lg leading-8 text-gray-700 dark:text-gray-300 mb-5">
          {children}
        </p>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-disc list-inside space-y-2 my-4 text-gray-700 dark:text-gray-300">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal list-inside space-y-2 my-4 text-gray-700 dark:text-gray-300">
          {children}
        </ol>
      ),
    },
  };

  return (
    <>
      <Background />
      <div className="px-6 sm:px-10 lg:px-0 max-w-4xl mx-auto py-12">
        <button
          className="mb-8 text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
          onClick={() => window.history.back()}
        >
          <IoIosArrowBack />
        </button>

        {blog.mainImage?.asset?.url && (
          <div className="mb-10">
            <Image
              src={blog.mainImage.asset.url}
              alt={blog.title}
              width={1000}
              height={500}
              className="rounded-2xl shadow-md object-cover w-full max-h-[500px]"
            />
          </div>
        )}

        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 text-gray-900 dark:text-white">
          {blog.title}
        </h1>

        <p className="text-gray-500 dark:text-gray-400 text-sm mb-10">
          {new Date(blog.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          <PortableText value={blog.content} components={components} />
        </article>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == "blog"]{ slug }`;
  const blogs = await client.fetch(query);

  const paths = blogs.map((b: any) => ({
    params: { slug: b.slug.current },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "blog" && slug.current == $slug][0]{
    _id,
    title,
    date,
    content,
    mainImage{ asset->{url} }
  }`;

  const blog = await client.fetch(query, { slug: params?.slug });

  return {
    props: { blog },
    revalidate: 60,
  };
};

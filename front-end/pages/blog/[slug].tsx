import { GetStaticPaths, GetStaticProps } from "next";
import { client } from "@/libs/sanity";
import { PortableText } from "@portabletext/react";

export default function BlogDetail({ blog }: { blog: any }) {
  if (!blog) return <p>Not found</p>;

  return (
    <div className="px-6 sm:px-10 max-w-3xl mx-auto py-12">
      <button
        className="mb-4 text-blue-500 hover:underline"
        onClick={() => window.history.back()}
      >
        Back
      </button>
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-500 mb-8">
        {new Date(blog.date).toLocaleDateString()}
      </p>
      <PortableText value={blog.content} />
    </div>
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

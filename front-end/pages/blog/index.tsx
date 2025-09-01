import { GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/libs/sanity";
import { IoIosArrowBack } from "react-icons/io";
import ToggleButton from "@/components/Dark-Light/ToggleButton";
import Background from "@/components/Background/Background";

interface Blog {
  _id: string;
  title: string;
  text: string;
  techs: string[];
  slug: { current: string };
  date: string;
  mainImage?: { asset: { url: string } };
}

interface Props {
  blogs: Blog[];
}

export default function BlogPage({ blogs }: Props) {
  if (!blogs.length) {
    return <p className="text-center text-lg text-gray-500">No posts yet.</p>;
  }

  return (
    <>
    <Background />
      <div className="flex items-center justify-between mb-5 mt-5">
        <button
          className="dark:text-stone-400 text-stone-900 text-3xl border-[1px] border-stone-700 rounded-2xl px-1 py-1 transition-all duration-500 dark:hover:bg-white dark:hover:text-stone-950 hover:text-stone-950 hover:scale-110"
          onClick={() => window.history.back()}
        >
          <IoIosArrowBack />
        </button>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 ">
          MAHDI
        </h1>
        <span>
          <ToggleButton />
        </span>
      </div>
    <div
      className="px-6 sm:px-10 py-10 bg-gray-100 dark:bg-[#0d0d0d] min-h-screen
      my-10 rounded-2xl transition-colors duration-500"
    >
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="group bg-white dark:bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-stone-700"
          >
            {blog.mainImage?.asset?.url && (
              <div className="overflow-hidden">
                <Image
                  src={blog.mainImage.asset.url}
                  alt={blog.title}
                  width={600}
                  height={300}
                  className="h-48 w-full object-cover transform group-hover:scale-105 transition duration-500"
                />
              </div>
            )}

            <div className="p-6">
              <Link href={`/blog/${blog.slug.current}`}>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:dark:text-[#c8f31d] group-hover:text-green-700 transition-colors">
                  {blog.title}
                </h2>
              </Link>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {new Date(blog.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 line-clamp-3">
                {blog.text}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {blog.techs?.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 rounded-full border border-gray-300 dark:border-stone-700 bg-gray-100 dark:bg-[#2a2a2a] text-gray-700 dark:text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const query = `*[_type == "blog"] | order(date desc){
    _id,
    title,
    "text": description,
    techs,
    slug,
    date,
    mainImage{
      asset->{url}
    }
  }`;

  const blogs = await client.fetch(query);

  return {
    props: { blogs },
    revalidate: 60,
  };
};

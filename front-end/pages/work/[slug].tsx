import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { client } from "@/libs/sanity";
import { IoIosArrowBack } from "react-icons/io";

type Work = {
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
  github?: string;
  techStack?: string[];
};

type WorkProps = {
  work: Work | null;
};

const WorkDetailPage: React.FC<WorkProps> = ({ work }) => {
  const router = useRouter();

  if (router.isFallback) return <div>Loading...</div>;
  if (!work) return <div>Work not found</div>;

  return (
    <>
      {/* <ScrollProgress /> */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between gap-5 mb-8">
          <div className="flex items-center gap-3 pointer-events-auto">
            <button
              className="dark:text-stone-400 text-stone-900 text-3xl border-[1px] border-stone-700 rounded-2xl px-1 py-1 transition-all duration-500 dark:hover:bg-white dark:hover:text-stone-950 hover:text-stone-950 hover:scale-110"
              onClick={() => window.history.back()}
            >
              <IoIosArrowBack />
            </button>
            <h2 className="dark:text-stone-100 text-stone-900 text-lg font-bold">
              Mahdi&apos;s Work
            </h2>
          </div>
          {/* <ToggleButton /> */}
        </div>

        <div className="bg-white dark:bg-[#121212] shadow-lg rounded-2xl p-8 transition-colors duration-500">
          <img
            src={work.imageUrl}
            alt={work.title}
            className="w-full h-64 sm:h-80 object-cover rounded-2xl mb-6 shadow-md"
          />
          <h1 className="text-3xl font-bold dark:text-stone-100 text-stone-900 mb-4">
            {work.title}
          </h1>
          <p className="text-gray-700 dark:text-stone-200 whitespace-pre-line mb-6">
            {work.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {(work.techStack ?? []).map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-gray-200 dark:bg-stone-700 dark:text-stone-100 text-gray-800 rounded-full text-sm font-semibold"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            {work.link && (
              <a
                href={work.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-stone-200 dark:bg-stone-700/30 text-stone-950 dark:text-white rounded-lg"
              >
                Live Demo
              </a>
            )}
            {work.github && (
              <a
                href={work.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-stone-200 dark:bg-stone-700/30 text-stone-950 dark:text-white rounded-lg"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkDetailPage;


export const getStaticPaths: GetStaticPaths = async () => {
  const works: { slug: { current: string } }[] = await client.fetch(
    `*[_type == "work"]{ slug }`
  );
  const paths = works.map((w) => ({ params: { slug: w.slug.current } }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug;
  const work: Work | null = await client.fetch(
    `*[_type == "work" && slug.current == "${slug}"][0]{
      title,
      description,
      "imageUrl": image.asset->url,
      link,
      github,
      techStack
    }`
  );

  return { props: { work } };
};

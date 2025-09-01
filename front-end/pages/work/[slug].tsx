import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { client } from "@/libs/sanity";
import { IoIosArrowBack } from "react-icons/io";
import Navbar from "@/components/Navigation/NavPages";
import ToggleButton from "@/components/Dark-Light/ToggleButton";
import { CiCalendarDate } from "react-icons/ci";
import { TbCategoryPlus } from "react-icons/tb";

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
          <Navbar />
          <ToggleButton />
        </div>

        <div className="bg-white dark:bg-[#121212] shadow-lg rounded-2xl p-8 px-20 transition-colors duration-500">
          <img
            src={work.imageUrl}
            alt={work.title}
            className="w-full h-64  sm:h-[500px] object-cover rounded-xl mt-4 mb-6 shadow-md"
          />
          <h1 className="text-3xl font-bold dark:text-[#c8f31d] text-stone-900 mb-4">
            {work.title}
          </h1>
          <div>
            <p className="text-gray-700 dark:text-stone-200 whitespace-pre-line mb-6">
              {work.description}
            </p>
            <div>
              <div>
                <span>
                  <span>
                    <CiCalendarDate/>
                  </span>
                  <h4>Date:</h4>
                </span>
                <p>6, AUG 2025</p>
              </div>
              <div>
                <span>
                  <span>
                    <TbCategoryPlus/>
                  </span>
                  <h4>Categories</h4>
                </span>
                <p>Website</p>
              </div>
              <div>
                <span>
                  <span>
                    <CiCalendarDate/>
                  </span>
                  <h4>Date:</h4>
                </span>
                <p>6, AUG 2025</p>
              </div>
              <div>
                <span>
                  <span>
                    <CiCalendarDate/>
                  </span>
                  <h4>Date:</h4>
                </span>
                <p>6, AUG 2025</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {(work.techStack ?? []).map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 border-[1px] border-stone-700 bg-transparent dark:text-stone-100 text-gray-800 rounded-full text-sm font-semibold"
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

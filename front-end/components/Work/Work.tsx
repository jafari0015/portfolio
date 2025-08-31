// components/Work/Work.tsx
import SpotLightCard from "@/components/Animations/SpotLightCard";
import Link from "next/link";

interface WorkType {
  title: string;
  description: string;
  imageUrl: string;
  github: string;
  slug: { current: string };
  techStack?: string[];
}
interface WorkProps {
  works: WorkType[];
}
const Work: React.FC<WorkProps> = ({ works }) => {
  return (
    <section id="work" className="mt-10 px-4">
      <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-6">
        {works.map((work) => (
          <SpotLightCard key={work.slug.current} className="p-6 ">
            <div>
              <div className="lg:w-full lg:h-[150px] md:w-full md:h-[250px] xl:h-[180px]">
                <a href={work.github} target="_blank" rel="noopener noreferrer">
                  <img
                    src={work.imageUrl}
                    alt={work.title}
                    className="w-full h-full max-w-full max-h-full rounded-2xl z-50 hover:scale-105 transition-all duration-700 dark:hover:border-[1px] dark:hover:border-stone-700 hover:border-[1px] hover:border-stone-200"
                  />
                </a>
              </div>
              <h2 className="dark:text-stone-100 text-stone-900 text-2xl font-semibold mt-4">
                {work.title}
              </h2>
              <p className="dark:text-stone-100 text-stone-900 text-medium mt-2 line-clamp-2">
                {work.description.split("\n").map((para, idx) => (
                  <span key={idx}>{para}</span>
                ))}
              </p>
              <div className="flex items-center relative justify-start gap-2 mt-3 dark:text-indigo-50 font-semibold">
                <div className="grid grid-cols-2 gap-1 sm:flex">
                  {(work.techStack ?? []).map((tech, idx) => (
                    <span
                      className="dark:bg-stone-700 dark:hover:bg-white dark:hover:text-stone-900 hover:scale-105 transition-all duration-500 cursor-pointer bg-gray-300 hover:bg-stone-900 hover:text-stone-300 dark:text-stone-100 text-xs rounded-2xl px-2 p-1"
                      key={idx}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="absolute -right-3 -bottom-3">
                  <Link href={`/work/${work.slug.current}`}>
                    <button className="px-2 py-1 bg-indigo-800 text-white rounded-md">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </SpotLightCard>
        ))}
      </div>
    </section>
  );
};

export default Work;

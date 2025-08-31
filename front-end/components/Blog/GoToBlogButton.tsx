import Link from "next/link";

export default function GoToBlogButton() {
  return (
    <div className="flex items-center justify-center">
      <Link
      href="/blog" 
      className=" mt-10 px-6 py-3 bg-transparent  dark:text-white text-stone-950 dark:border-[1px] border-stone-700 rounded-lg font-semibold 
                  transition-all duration-300 shadow-md hover:scale-105 text-center"
    >
     See more articles 
    </Link>
    </div>
  );
}

// components/Blog/Blog.tsx
import React from 'react'
import { FaCalendar } from "react-icons/fa";
import { RxExternalLink } from "react-icons/rx";
import { CiShoppingTag } from "react-icons/ci";
import Link from 'next/link';

interface BlogType {
  title: string;
  text: string;
  techs?: string[];
  slug: { current: string };
  date: string;
}

interface BlogProps {
  blogs: BlogType[];
}
const Blog: React.FC<BlogProps> = ({ blogs }) => {
  return (
    <section id='article'>
      <div className='lg:grid grid-cols-3 gap-6 mt-10' >
      {blogs.map((blog) => (
        <div key={blog.slug.current} className='dark:text-stone-100 text-stone-900 border-[1px] md:mt-8 mt-6 border-neutral-300 dark:border-stone-700 bg-neutral-100 backImage dark:backdrop-blur-md rounded-xl p-6'>
          <h2 className='text-[23px]'>{blog.title}</h2>
          <div>
            <span className='flex text-xs mt-2 dark:text-stone-500 text-stone-600 items-center justify-start gap-3'>
              <FaCalendar /> <span>{new Date(blog.date).toLocaleDateString("en-US", { year: "numeric", month:"long", day:"numeric" })}</span>
            </span>
          </div>
          <p className='text-[16px] dark:text-slate-500 text-stone-800 mt-4 line-clamp-5'>
            {blog.text}
          </p>
          <div className='grid grid-cols-2 sm:flex text-xs mt-3 items-center justify-start gap-2'>
            {(blog.techs ?? []).map((tech , index) => (
              <span key={index} className='px-2 flex items-center gap-1 py-1 border-[1px] border-neutral-400 dark:border-stone-700 rounded-xl'>
                <CiShoppingTag /> {tech}
              </span>
            ))}
          </div>
          <Link href={`/blog/${blog.slug.current}`}>
            <button className='flex font-semibold items-center  justify-center gap-3 py-2 w-full group relative overflow-hidden rounded-xl border-[1px] border-neutral-300 dark:border-stone-600 mt-4 dark:hover:bg-stone-800 transition-all duration-700'>
              <span className='relative z-10 flex items-center gap-3 justify-center'>
                Read the full article <span><RxExternalLink /></span>
              </span>
              <span className='absolute inset-0 bg-neutral-200 dark:bg-stone-700 duration-700 transition-transform 
                               ease-out group-hover:translate-x-0 -translate-x-full'></span>
            </button>
          </Link>
        </div>
      ))}  
    </div>
    </section>
  )
}

export default Blog;

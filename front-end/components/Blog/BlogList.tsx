import React, { useState, useEffect } from 'react';
import avatar from "../assets/avatar1.png";
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { client } from '../libs/sanityClient.js';
import ToggleButton from '../component/ToggleButton.jsx';
import ScrollProgress from '../component/ScrollProgress.jsx';

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);



    useEffect(() => {
        let ignore = false;
        setIsLoading(true);

        const query = `*[_type == "blog"] | order(date desc) {
        _id,
        title,
        "text": description,
        techs,
        slug,
        date
      }`;

        client.fetch(query)
            .then((data) => {
                if (!ignore) setBlogs(data);
            })
            .catch((err) => {
                console.error(err);
                if (!ignore) setError('Failed to load blogs.');
            })
            .finally(() => {
                if (!ignore) setIsLoading(false);
            });

        return () => { ignore = true; };
    }, []);

    if (isLoading) {
        return <p className="text-2xl dark:text-stone-50 text-stone-950 flex items-center justify-center mt-20" >Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    if (!blogs.length) {
        return <p className="text-center dark:text-stone-50 text-stone-950">No posts yet.</p>;
    }

    return (
        <>
        <ScrollProgress/>
            <div className=' px-4 sm:px-8 flex justify-center pt-10 pb-8'>
                <div className='sm:max-w-[700px] w-full'>


                    <div className='flex items-center justify-between gap-5 mb-8'>
                        <div className='flex items-center gap-3'>
                            <button
                                className='dark:text-stone-400 text-stone-900 text-3xl border-[1px] border-stone-700 rounded-2xl px-1 py-1 transition-all duration-500 dark:hover:bg-white dark:hover:text-stone-950 hover:text-stone-950 hover:scale-110'
                                onClick={() => window.history.back()}
                            >
                                <IoIosArrowBack />
                            </button>
                            <img src={avatar} alt="Mahdi Jafari" className='w-10 rounded-full' />
                            <h2 className='dark:text-stone-100 text-stone-900 text-lg font-bold'>Mahdi's Blog</h2>
                        </div>
                        <ToggleButton />
                    </div>


                    <div className='space-y-6 bg-white dark:bg-stone-900 shadow-lg rounded-2xl p-8 transition-colors duration-500'>
                        {blogs.map((blog) => (
                            <Link to={`/detailBlog/${blog.slug.current}`} key={blog.slug.current}>
                                <div className='p-4 rounded-xl border-[1px] mt-4 border-neutral-300 dark:border-stone-700 bg-neutral-100 dark:bg-stone-900/55 dark:backdrop-blur-md hover:shadow-lg transition-all duration-500 cursor-pointer'>
                                    <h2 className='text-xl font-bold dark:text-stone-100 text-stone-900'>{blog.title}</h2>
                                    <p className='text-xs dark:text-stone-400 text-stone-600 mt-1'>
                                        {new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </p>
                                    <p className='text-sm dark:text-stone-300 text-stone-800 mt-2 line-clamp-3'>
                                        {blog.text}
                                    </p>

                                    <div className='flex flex-wrap gap-2 mt-3'>
                                        {blog.techs?.map((tech, idx) => (
                                            <span key={idx} className='text-xs px-2 py-1 bg-gray-200 dark:bg-stone-900 text-stone-900 dark:text-stone-100  
                                        dark:border-stone-700 border-[1px] dark:hover:bg-white dark:hover:text-stone-900 transition-all duration-700 hover:scale-105 rounded-full dark:
                                        '>
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>
            </div>
        </>
    );
};

export default BlogPage;

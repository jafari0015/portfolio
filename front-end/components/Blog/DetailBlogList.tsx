import { PortableText } from "@portabletext/react";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { client } from "../libs/sanityClient";
import ToggleButton from "../component/ToggleButton";
import ScrollProgress from "../component/ScrollProgress";

const DetailBlog = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ignore = false;
        setIsLoading(true);
        setError(null);

        client
            .fetch(
                `*[_type == "blog" && slug.current == $slug][0]{
          title,
          description,
          date,
          content
        }`,
                { slug }
            )
            .then((data) => {
                if (!ignore) {
                    if (data) {
                        setBlog(data);
                    } else {
                        setError("Blog not found.");
                    }
                }
            })
            .catch((err) => {
                console.error(err);
                if (!ignore) setError("Failed to load blog. Please try again later.");
            })
            .finally(() => {
                if (!ignore) setIsLoading(false);
            });

        return () => {
            ignore = true;
        };
    }, [slug]);

    if (isLoading) {
        return <p className="text-center text-2xl text-stone-950 dark:text-stone-50 font-bold">Loading blog...</p>;
    }

    if (error) {
        return <p className="text-center font-bold text-red-500">{error}</p>;
    }

    return (
        <>
        <ScrollProgress />
            <div className=" flex items-center justify-center  px-6 sm:px-0">
                <div className="max-w-[700px] w-full mt-10">
                    <div className="flex items-center justify-start gap-4">
                        <button
                            className="dark:text-stone-400 text-stone-900 text-3xl mt-2 border-[1px] border-stone-700 rounded-2xl px-1 py-1 transition-all duration-500 
                                   dark:hover:bg-white dark:hover:text-stone-950 hover:text-stone-950 hover:scale-110"
                            onClick={() => window.history.back()}
                        >
                            <IoIosArrowBack />
                        </button>

                        <div className="dark:text-stone-400 text-stone-900 text-lg sm:text-3xl">
                            {blog.title}
                        </div>
                        <ToggleButton />
                    </div>
                    <div className="bg-white dark:bg-stone-900 shadow-lg rounded-2xl mt-5 p-8 transition-colors duration-500">
                        <div className="dark:text-stone-400 text-stone-900 text-xs mt-5">
                            {new Date(blog.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            })}
                        </div>


                        <div className="dark:text-stone-400 text-stone-900 text-base mt-10 pb-5">
                            {blog.content && (
                                <PortableText
                                    value={blog.content}
                                    components={{
                                        block: {
                                            normal: ({ children }) => <p className="my-2">{children}</p>
                                        },
                                        marks: {
                                            strong: ({ children }) => <strong>{children}</strong>,
                                            em: ({ children }) => <em>{children}</em>
                                        }
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailBlog;

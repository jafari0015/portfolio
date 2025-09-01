import React from "react";

const About = () => {
  return (
    <>
      <div id="about">
        <div className="lg:flex items-center lg:gap-4 justify-between md:block ">
          <div>
            <div className="mt-2 backImage border-[1px] dark:border-stone-700  relative 
                          border-stone-300 bg-stone-400/5 backdrop-blur-md lg:max-w-[600px] p-8 rounded-lg">
              <h2 className="dark:text-stone-50 text-stone-900 text-xl">
                Developer Journey
              </h2>
              <p className="dark:text-stone-100 mt-8 text-stone-900">
                I’m Mahdi Jafari, a junior front-end developer passionate about
                crafting dynamic, user-focused web applications. Currently, I’m
                advancing my expertise in React by applying complex concepts to
                real-world projects. My skill set spans modern web development
                practices, enabling me to create highly interactive and
                responsive applications using frameworks like React. I
                prioritize both product experience and design precision, aiming
                to deliver solutions that balance technical excellence with
                meaningful user value
              </p>
              <div className="w-[530px] h-[2px] bg-[#c8f31d] absolute bottom-0  "></div>
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;

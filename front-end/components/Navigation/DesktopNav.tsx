import React, { memo, useEffect, useState } from "react";
import { IoGlobeOutline } from "react-icons/io5";
import { FaCode } from "react-icons/fa";
import { GoWorkflow } from "react-icons/go";
import { PiBookOpenText } from "react-icons/pi";
import { FaRegMessage } from "react-icons/fa6";
import { Link } from "react-scroll";
import ToggleButton from "@/components/Dark-Light/ToggleButton";

const Navbar = memo(function Navbar() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [active, setActive] = useState("home");

  const navItems = [
    { id: "home", label: "front page", icon: <IoGlobeOutline />, target: "home" },
    { id: "about", label: "about", icon: <FaCode />, target: "about" },
    { id: "work", label: "work", icon: <GoWorkflow />, target: "work" }, 
    { id: "article", label: "article", icon: <PiBookOpenText />, target: "blog" }, 
    { id: "contact", label: "contact", icon: <FaRegMessage />, target: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setNavScrolled(true);
      } else {
        setNavScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`hidden sm:flex fixed top-4 left-1/2 -translate-x-1/2 z-40  transition-all duration-[1s] rounded-full ${
          navScrolled
            ? "dark:bg-stone-900/80 bg-stone-200 xl:w-[40%] md:w-[70%] fixed backdrop-blur-md"
            : "bg-transparent w-[90%]"
        }`}
      >
        <div className="container mx-auto px-6 h-16 flex items-center justify-between transition-all duration-[3s]">
          {/* Logo */}
          <div className="hidden sm:flex bg-gradient-to-r from-indigo-900 to-slate-500 dark:to-indigo-700 text-transparent bg-clip-text text-4xl font-bold cursor-pointer transition-all duration-1000">
            <Link to="home" smooth={true} duration={700}>
              MJ
            </Link>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-7">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.target} // 👈 scrolls to mapped section
                smooth={true}
                duration={700}
                spy={true}
                onSetActive={() => setActive(item.id)}
                className="relative cursor-pointer"
              >
                <span
                  className={`transition-all duration-300 ${
                    active === item.id
                      ? "drop-shadow-[0_0_10px_#000000] dark:drop-shadow-[0_0_10px_#e5e7eb] text-stone-900 dark:text-gray-100"
                      : "text-stone-900 dark:text-gray-400"
                  } hover:drop-shadow-[0_0_10px_#000000] dark:hover:drop-shadow-[0_0_10px_#e5e7eb] hover:dark:text-gray-100`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Dark / Light Toggle */}
          <div className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-accent-foreground h-9 w-9 rounded-full hover:bg-zinc-100/80 dark:hover:bg-zinc-800/50 transition-all duration-700 hover:scale-110 text-stone-100">
            <ToggleButton />
          </div>
        </div>
      </nav>
    </>
  );
});

export default Navbar;

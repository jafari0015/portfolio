import Link from "next/link";
import React from 'react'

const  Navbar = () => {
  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-stone-800 dark:text-white">MAHDI </h1>

      <ul className="flex gap-6">
        <li>
          <Link href="/" className="text-stone-700 dark:text-stone-200 dark:hover:text-[#c8f31d] transition-all duration-700">
            Front Page
          </Link>
        </li>
        <li>
          <Link href="/about" className="text-stone-700 dark:text-stone-200 dark:hover:text-[#c8f31d] transition-all duration-700">
            About
          </Link>
        </li>
        <li>
          <Link href="/about" className="text-stone-700 dark:text-stone-200 dark:hover:text-[#c8f31d] transition-all duration-700">
            Work
          </Link>
        </li>
        <li>
          <Link href="/about" className="text-stone-700 dark:text-stone-200 dark:hover:text-[#c8f31d] transition-all duration-700">
            Blog
          </Link>
        </li>
        <li>
          <Link href="/contact" className="text-stone-700 dark:text-stone-200 dark:hover:text-[#c8f31d] transition-all duration-700">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;
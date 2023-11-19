import React from "react";
import Logo from '../../public/logo.png'
import Image from "next/image";
import Link from 'next/link'
const Nav = () => {
  return (<>
<header className="text-gray-600 body-font bg-white">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <Link href="/" className="flex title-font font-medium items-center text-gray-900 mb-2 md:mb-0 cursor-pointer">
      <Image width={60} height={60} src={Logo.src} />
      <span className="ml-3 text-xl">nx1Lyrics</span>
    </Link>
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
      <Link href="/submit-lyric" className="mr-5 cursor-pointer font-bold  hover:text-gray-900">Submit Lyrics</Link>
      <Link href="/feedback" className="mr-5 cursor-pointer font-bold  hover:text-gray-900">Feedback</Link>
    </nav>
  </div>
</header>
  </>
  );
};

export default Nav;

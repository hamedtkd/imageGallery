import Link from "next/link";
import React from "react";
import Search from "./Search";

export default function Navbar() {
  return (
    <header className="bg-background  py-6 sticky top-0 z-50 text-gray-950">
      <nav className="container mx-auto bg-background flex flex-col sm:flex-row gap-4  items-center  sm:justify-between px-1 font-bold">
        <h1 className=" sm:text-3xl text-2xl whitespace-nowrap">
          <Link href="/">Image Gallery</Link>
        </h1>
        <div className="flex gap-4  hover:[&>a]:text-gray-700 transition-colors">
          <Link href="/">Image Gallery</Link>
          <Link href="/videos">Video Gallery</Link>
        </div>
        <Search />
      </nav>
    </header>
  );
}

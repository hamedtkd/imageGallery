"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

function Search() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    router.push(`/results/${search}`);
    setSearch("");
    if (!search) return;
  };
  return (
    <form
      className="flex justify-center md:justify-between"
      onSubmit={handleSubmit}
    >
      <input
        type="search"
        placeholder="search..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        className=" bg-gray-900 px-4 py-2 rounded-2xl text-lg   w-[260px] text-gray-50 outline-none"
      />
    </form>
  );
}

export default Search;

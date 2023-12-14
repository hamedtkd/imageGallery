"use client";

import React, { useState } from "react";
import { CustomPagination } from "./ui/Pagination";
import {
  useParams,
  usePathname,
  useRouter as useNavigation,
} from "next/navigation";
import { useRouter } from "next/router";
import useQueryString from "@/hook/useQueryString";

type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  // currentPage?: number;
  // variant?: "standard" | "border" | "clear";
  // onPageChange: (page: number) => void;
};

function Pagination({ ...props }: PaginationProps) {
  const pathname = usePathname();
  const { itemsPerPage, totalItems } = props;
  const navigation = useNavigation();
  const { queryObject } = useQueryString();
  console.log(queryObject.page);

  const [currentPage, setCurrentPage] = useState(1);
  // Set the total number of items
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    navigation.push(
      `${
        process.env.Base_URL ?? "http://localhost:3000"
      }${pathname}?page=${page}`
    );
  };

  return (
    <div>
      <CustomPagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Pagination;

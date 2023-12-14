"use client";

import { VariantProps, cva } from "class-variance-authority";
import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { Button } from "./button";
export interface CustomPaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  variant?: "standard" | "border" | "clear";
  onPageChange: (page: number) => void;
}

const paginationVariants = cva(` body-1 font-medium h-[40px] `, {
  variants: {
    variant: {
      standard:
        "ml-micro-lg py-0 justify-center items-center  rounded-md bg-flexGray-50 text-flexGray-500",
      border:
        "ml-micro-lg border-2 border-flexGray-100 py-0justify-center items-center  rounded-md text-flexGray-500 bg-background",
      clear:
        "ml-micro-lg py-0 justify-center items-center  rounded-md text-flexGray-500 bg-background",
    },
  },
  defaultVariants: {
    variant: "standard",
  },
});

export const CustomPagination: React.FC<
  CustomPaginationProps & VariantProps<typeof paginationVariants>
> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  variant = "standard",
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Function to generate an array of page numbers
  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Adjust this number as needed

    if (totalPages <= maxPagesToShow) {
      // If total pages are less than or equal to maxPagesToShow, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Otherwise, show a limited range of pages with ellipsis
      const halfRange = Math.floor(maxPagesToShow / 2);
      const startPage = Math.max(currentPage - halfRange, 1);
      const endPage = Math.min(currentPage + halfRange, totalPages);

      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) {
          pageNumbers.push("...");
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push("...");
        }
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  const pageNumbers = generatePageNumbers();

  // Function to handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // Function to handle previous and next page clicks
  const handlePreviousPage = () => {
    handlePageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    handlePageChange(currentPage + 1);
  };

  return (
    <div className=" flex gap-micro-sm justify-between  py-0 ">
      <Button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className="text-flexGray-700 "
      >
        Previous
      </Button>
      <div>
        {pageNumbers.map((page: any, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <button
                className={cn(
                  paginationVariants({ variant }),
                  `rounded-md cursor-auto  min-w-[40px] `
                )}
              >
                ...
              </button>
            ) : (
              <button
                className={cn(
                  paginationVariants({ variant }),
                  `${`body-1 font-bold `}   rounded-md  px-[11px] min-w-[40px] w-fill
                  ${currentPage === page && "text-red-500"}`
                )}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      <Button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="text-flexGray-700"
      >
        Next
      </Button>
    </div>
  );
};
CustomPagination.displayName = "Pagination";

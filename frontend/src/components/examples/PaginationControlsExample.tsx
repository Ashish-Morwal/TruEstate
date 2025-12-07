import { useState } from "react";
import PaginationControls from "../sales/PaginationControls";

export default function PaginationControlsExample() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 12;
  const totalItems = 115;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log("Page changed to:", page);
  };

  return (
    <div className="w-full max-w-2xl">
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

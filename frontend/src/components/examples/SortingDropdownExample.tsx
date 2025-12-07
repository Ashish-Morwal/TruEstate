import { useState } from "react";
import SortingDropdown, { type SortOption } from "../sales/SortingDropdown";

export default function SortingDropdownExample() {
  const [sortBy, setSortBy] = useState<SortOption>("date_desc");

  const handleSort = (value: SortOption) => {
    setSortBy(value);
    console.log("Sort changed to:", value);
  };

  return (
    <SortingDropdown value={sortBy} onChange={handleSort} />
  );
}

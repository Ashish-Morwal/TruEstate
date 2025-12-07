import { useState } from "react";
import SearchBar from "../sales/SearchBar";

export default function SearchBarExample() {
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (value: string) => {
    setIsLoading(true);
    setSearchValue(value);
    setTimeout(() => setIsLoading(false), 500);
    console.log("Search query:", value);
  };

  return (
    <div className="w-full max-w-md">
      <SearchBar 
        value={searchValue} 
        onChange={handleSearch}
        isLoading={isLoading}
      />
    </div>
  );
}

import { useState } from "react";
import FilterPanel, { type FilterState, type FilterOptions } from "../sales/FilterPanel";

const mockOptions: FilterOptions = {
  regions: ["North", "South", "East", "West", "Central"],
  genders: ["Male", "Female", "Other"],
  categories: ["Electronics", "Clothing", "Food", "Home", "Sports", "Beauty"],
  tags: ["Sale", "New", "Popular", "Limited", "Premium", "Clearance"],
  paymentMethods: ["Credit Card", "Debit Card", "Cash", "UPI", "Net Banking"],
};

const initialFilters: FilterState = {
  regions: [],
  genders: [],
  categories: [],
  tags: [],
  paymentMethods: [],
  ageMin: "",
  ageMax: "",
  dateStart: "",
  dateEnd: "",
};

export default function FilterPanelExample() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const handleClear = () => {
    setFilters(initialFilters);
    console.log("Filters cleared");
  };

  return (
    <div className="w-72 border rounded-lg bg-sidebar">
      <FilterPanel
        filters={filters}
        options={mockOptions}
        onChange={(newFilters) => {
          setFilters(newFilters);
          console.log("Filters updated:", newFilters);
        }}
        onClear={handleClear}
      />
    </div>
  );
}

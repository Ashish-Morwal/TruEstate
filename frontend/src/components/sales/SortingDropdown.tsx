import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";

export type SortOption = "date_desc" | "quantity_desc" | "customer_asc";

interface SortingDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "date_desc", label: "Date (Newest)" },
  { value: "quantity_desc", label: "Quantity (High to Low)" },
  { value: "customer_asc", label: "Customer (A-Z)" },
];

export default function SortingDropdown({ value, onChange }: SortingDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
      <Select value={value} onValueChange={(v) => onChange(v as SortOption)}>
        <SelectTrigger className="w-[180px] h-9" data-testid="select-sorting">
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem 
              key={option.value} 
              value={option.value}
              data-testid={`option-sort-${option.value}`}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

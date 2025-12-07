import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Filter, ChevronDown, ChevronUp } from "lucide-react";
import FilterCheckboxGroup from "./FilterCheckboxGroup";
import RangeInput from "./RangeInput";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export interface FilterState {
  regions: string[];
  genders: string[];
  categories: string[];
  tags: string[];
  paymentMethods: string[];
  ageMin: string;
  ageMax: string;
  dateStart: string;
  dateEnd: string;
}

export interface FilterOptions {
  regions: string[];
  genders: string[];
  categories: string[];
  tags: string[];
  paymentMethods: string[];
}

interface FilterPanelProps {
  filters: FilterState;
  options: FilterOptions;
  onChange: (filters: FilterState) => void;
  onClear: () => void;
}

export default function FilterPanel({ filters, options, onChange, onClear }: FilterPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    region: true,
    gender: true,
    category: true,
    tags: false,
    payment: false,
    age: true,
    date: true,
  });

  const hasActiveFilters = 
    filters.regions.length > 0 ||
    filters.genders.length > 0 ||
    filters.categories.length > 0 ||
    filters.tags.length > 0 ||
    filters.paymentMethods.length > 0 ||
    filters.ageMin !== "" ||
    filters.ageMax !== "" ||
    filters.dateStart !== "" ||
    filters.dateEnd !== "";

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const FilterSection = ({ 
    id, 
    title, 
    children 
  }: { 
    id: string; 
    title: string; 
    children: React.ReactNode;
  }) => (
    <Collapsible open={expandedSections[id]} onOpenChange={() => toggleSection(id)}>
      <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium hover-elevate active-elevate-2 rounded-md px-2 -mx-2">
        <span>{title}</span>
        {expandedSections[id] ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2 pb-4">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );

  return (
    <div className="space-y-2 p-4">
      <div className="flex items-center justify-between gap-2 pb-2 border-b">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="font-semibold text-sm">Filters</span>
        </div>
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClear}
            className="h-7 text-xs"
            data-testid="button-clear-all-filters"
          >
            <X className="h-3 w-3 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      <div className="space-y-1">
        <FilterSection id="region" title="Customer Region">
          <FilterCheckboxGroup
            label="Region"
            options={options.regions}
            selectedValues={filters.regions}
            onChange={(values) => onChange({ ...filters, regions: values })}
          />
        </FilterSection>

        <FilterSection id="gender" title="Gender">
          <FilterCheckboxGroup
            label="Gender"
            options={options.genders}
            selectedValues={filters.genders}
            onChange={(values) => onChange({ ...filters, genders: values })}
          />
        </FilterSection>

        <FilterSection id="category" title="Product Category">
          <FilterCheckboxGroup
            label="Category"
            options={options.categories}
            selectedValues={filters.categories}
            onChange={(values) => onChange({ ...filters, categories: values })}
          />
        </FilterSection>

        <FilterSection id="tags" title="Tags">
          <FilterCheckboxGroup
            label="Tags"
            options={options.tags}
            selectedValues={filters.tags}
            onChange={(values) => onChange({ ...filters, tags: values })}
          />
        </FilterSection>

        <FilterSection id="payment" title="Payment Method">
          <FilterCheckboxGroup
            label="Payment"
            options={options.paymentMethods}
            selectedValues={filters.paymentMethods}
            onChange={(values) => onChange({ ...filters, paymentMethods: values })}
          />
        </FilterSection>

        <FilterSection id="age" title="Age Range">
          <RangeInput
            label="Age"
            minValue={filters.ageMin}
            maxValue={filters.ageMax}
            onMinChange={(v) => onChange({ ...filters, ageMin: v })}
            onMaxChange={(v) => onChange({ ...filters, ageMax: v })}
            minPlaceholder="Min age"
            maxPlaceholder="Max age"
            type="number"
          />
        </FilterSection>

        <FilterSection id="date" title="Date Range">
          <RangeInput
            label="Date"
            minValue={filters.dateStart}
            maxValue={filters.dateEnd}
            onMinChange={(v) => onChange({ ...filters, dateStart: v })}
            onMaxChange={(v) => onChange({ ...filters, dateEnd: v })}
            minPlaceholder="Start date"
            maxPlaceholder="End date"
            type="date"
          />
        </FilterSection>
      </div>
    </div>
  );
}

import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FilterCheckboxGroupProps {
  label: string;
  options: string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  maxHeight?: number;
}

export default function FilterCheckboxGroup({
  label,
  options,
  selectedValues,
  onChange,
  maxHeight = 192,
}: FilterCheckboxGroupProps) {
  const handleToggle = (option: string) => {
    if (selectedValues.includes(option)) {
      onChange(selectedValues.filter((v) => v !== option));
    } else {
      onChange([...selectedValues, option]);
    }
  };

  const selectedCount = selectedValues.length;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        {selectedCount > 0 && (
          <Badge variant="secondary" className="text-xs px-1.5 py-0">
            {selectedCount}
          </Badge>
        )}
      </div>
      <ScrollArea style={{ maxHeight }} className="pr-2">
        <div className="space-y-2">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 cursor-pointer text-sm hover-elevate active-elevate-2 rounded-md py-1 px-1 -mx-1"
            >
              <Checkbox
                checked={selectedValues.includes(option)}
                onCheckedChange={() => handleToggle(option)}
                data-testid={`checkbox-${label.toLowerCase().replace(/\s/g, "-")}-${option.toLowerCase().replace(/\s/g, "-")}`}
              />
              <span className="truncate">{option}</span>
            </label>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

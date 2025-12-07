import { Input } from "@/components/ui/input";

interface RangeInputProps {
  label: string;
  minValue: string;
  maxValue: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
  minPlaceholder?: string;
  maxPlaceholder?: string;
  type?: "number" | "date";
}

export default function RangeInput({
  label,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  minPlaceholder = "Min",
  maxPlaceholder = "Max",
  type = "number",
}: RangeInputProps) {
  return (
    <div className="space-y-2">
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <div className="grid grid-cols-2 gap-2">
        <Input
          type={type}
          value={minValue}
          onChange={(e) => onMinChange(e.target.value)}
          placeholder={minPlaceholder}
          className="h-9 text-sm"
          data-testid={`input-${label.toLowerCase().replace(/\s/g, "-")}-min`}
        />
        <Input
          type={type}
          value={maxValue}
          onChange={(e) => onMaxChange(e.target.value)}
          placeholder={maxPlaceholder}
          className="h-9 text-sm"
          data-testid={`input-${label.toLowerCase().replace(/\s/g, "-")}-max`}
        />
      </div>
    </div>
  );
}

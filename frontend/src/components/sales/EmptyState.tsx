import { Inbox, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  type?: "no-results" | "no-data";
  hasActiveFilters?: boolean;
  onClearFilters?: () => void;
}

export default function EmptyState({
  type = "no-results",
  hasActiveFilters = false,
  onClearFilters,
}: EmptyStateProps) {
  const Icon = type === "no-results" ? SearchX : Inbox;
  const title = type === "no-results" ? "No results found" : "No transactions";
  const description = type === "no-results"
    ? "Try adjusting your search or filters to find what you're looking for."
    : "There are no transactions to display at this time.";

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center" data-testid="empty-state">
      <Icon className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2" data-testid="text-empty-title">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-4" data-testid="text-empty-description">
        {description}
      </p>
      {hasActiveFilters && onClearFilters && (
        <Button variant="outline" onClick={onClearFilters} data-testid="button-clear-filters">
          Clear all filters
        </Button>
      )}
    </div>
  );
}

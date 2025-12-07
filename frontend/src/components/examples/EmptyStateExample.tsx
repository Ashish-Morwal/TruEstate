import EmptyState from "../sales/EmptyState";

export default function EmptyStateExample() {
  return (
    <div className="w-full border rounded-lg">
      <EmptyState 
        type="no-results"
        hasActiveFilters={true}
        onClearFilters={() => console.log("Filters cleared")}
      />
    </div>
  );
}

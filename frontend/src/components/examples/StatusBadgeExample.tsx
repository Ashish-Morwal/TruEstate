import StatusBadge from "../sales/StatusBadge";

export default function StatusBadgeExample() {
  const statuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Returned"];

  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((status) => (
        <StatusBadge key={status} status={status} />
      ))}
    </div>
  );
}

import { Badge } from "@/components/ui/badge";

type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled" | "Returned";

interface StatusBadgeProps {
  status: string;
}

const statusStyles: Record<OrderStatus, string> = {
  Pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  Processing: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  Shipped: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  Delivered: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  Cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  Returned: "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-400",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const normalizedStatus = status as OrderStatus;
  const style = statusStyles[normalizedStatus] || statusStyles.Pending;

  return (
    <Badge 
      variant="secondary" 
      className={`${style} text-xs font-medium no-default-hover-elevate no-default-active-elevate`}
      data-testid={`badge-status-${status.toLowerCase()}`}
    >
      {status}
    </Badge>
  );
}

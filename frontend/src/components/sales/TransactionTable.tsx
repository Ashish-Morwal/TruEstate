import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export interface Transaction {
  id: string;
  transactionId: string;
  date: string;
  customerId: string;
  customerName: string;
  phoneNumber: string;
  gender: string;
  age: number;
  productCategory: string;
  quantity: number;
  totalAmount: number;
  customerRegion: string;
  productId: string;
  employeeName: string;
}

interface TransactionTableProps {
  data: Transaction[];
}

export default function TransactionTable({ data }: TransactionTableProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="border rounded-lg overflow-hidden" data-testid="transaction-table">
      <ScrollArea className="w-full">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30 border-b">
              <TableHead className="text-xs font-medium whitespace-nowrap">Transaction ID</TableHead>
              <TableHead className="text-xs font-medium whitespace-nowrap">Date</TableHead>
              <TableHead className="text-xs font-medium whitespace-nowrap">Customer ID</TableHead>
              <TableHead className="text-xs font-medium whitespace-nowrap">Customer name</TableHead>
              <TableHead className="text-xs font-medium whitespace-nowrap">Phone Number</TableHead>
              <TableHead className="text-xs font-medium whitespace-nowrap">Gender</TableHead>
              <TableHead className="text-xs font-medium whitespace-nowrap">Age</TableHead>
              <TableHead className="text-xs font-medium whitespace-nowrap">Product Category</TableHead>
              <TableHead className="text-xs font-medium whitespace-nowrap">Quantity</TableHead>
              <TableHead className="text-xs font-medium whitespace-nowrap">Total Amount</TableHead>
              <TableHead className="text-xs font-medium whitespace-nowrap">Customer region</TableHead>
              <TableHead className="text-xs font-medium whitespace-nowrap">Product ID</TableHead>
              <TableHead className="text-xs font-medium whitespace-nowrap">Employee name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((transaction, index) => (
              <TableRow 
                key={transaction.id} 
                className="h-12 border-b border-border/50"
                data-testid={`row-transaction-${index}`}
              >
                <TableCell className="text-sm font-medium text-primary" data-testid={`cell-txn-id-${index}`}>
                  {transaction.transactionId}
                </TableCell>
                <TableCell className="text-sm text-primary" data-testid={`cell-date-${index}`}>
                  {formatDate(transaction.date)}
                </TableCell>
                <TableCell className="text-sm text-primary" data-testid={`cell-customer-id-${index}`}>
                  {transaction.customerId}
                </TableCell>
                <TableCell className="text-sm" data-testid={`cell-customer-${index}`}>
                  {transaction.customerName}
                </TableCell>
                <TableCell className="text-sm" data-testid={`cell-phone-${index}`}>
                  {transaction.phoneNumber}
                </TableCell>
                <TableCell className="text-sm" data-testid={`cell-gender-${index}`}>
                  {transaction.gender}
                </TableCell>
                <TableCell className="text-sm" data-testid={`cell-age-${index}`}>
                  {transaction.age}
                </TableCell>
                <TableCell className="text-sm" data-testid={`cell-category-${index}`}>
                  {transaction.productCategory}
                </TableCell>
                <TableCell className="text-sm text-center" data-testid={`cell-quantity-${index}`}>
                  {String(transaction.quantity).padStart(2, '0')}
                </TableCell>
                <TableCell className="text-sm" data-testid={`cell-amount-${index}`}>
                  {formatCurrency(transaction.totalAmount)}
                </TableCell>
                <TableCell className="text-sm" data-testid={`cell-region-${index}`}>
                  {transaction.customerRegion}
                </TableCell>
                <TableCell className="text-sm" data-testid={`cell-product-id-${index}`}>
                  {transaction.productId}
                </TableCell>
                <TableCell className="text-sm" data-testid={`cell-employee-${index}`}>
                  {transaction.employeeName}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

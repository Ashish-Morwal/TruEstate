import TransactionTable, { type Transaction } from "../sales/TransactionTable";

// todo: remove mock functionality
const mockTransactions: Transaction[] = [
  {
    id: "1",
    transactionId: "1234567",
    date: "2023-09-26",
    customerId: "CUST12016",
    customerName: "Neha Yadav",
    phoneNumber: "+91 9123456789",
    gender: "Female",
    age: 25,
    productCategory: "Clothing",
    quantity: 1,
    totalAmount: 1000,
    customerRegion: "South",
    productId: "PROD0001",
    employeeName: "Harsh Agrawal",
  },
  {
    id: "2",
    transactionId: "1234568",
    date: "2023-09-26",
    customerId: "CUST12017",
    customerName: "Rahul Sharma",
    phoneNumber: "+91 9234567890",
    gender: "Male",
    age: 30,
    productCategory: "Electronics",
    quantity: 2,
    totalAmount: 5000,
    customerRegion: "North",
    productId: "PROD0002",
    employeeName: "Priya Sharma",
  },
  {
    id: "3",
    transactionId: "1234569",
    date: "2023-09-27",
    customerId: "CUST12018",
    customerName: "Priya Singh",
    phoneNumber: "+91 9345678901",
    gender: "Female",
    age: 28,
    productCategory: "Food",
    quantity: 3,
    totalAmount: 1500,
    customerRegion: "East",
    productId: "PROD0003",
    employeeName: "Rohan Mehta",
  },
];

export default function TransactionTableExample() {
  return (
    <div className="w-full overflow-hidden">
      <TransactionTable data={mockTransactions} />
    </div>
  );
}

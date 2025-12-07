import "dotenv/config";
import { db } from "./db";
import { transactions } from "./shared/schema";
import { sql } from "drizzle-orm";


const customers = [
  { id: "CUST12016", name: "Neha Yadav", phone: "+91 9123456789" },
  { id: "CUST12017", name: "Rahul Sharma", phone: "+91 9234567890" },
  { id: "CUST12018", name: "Priya Singh", phone: "+91 9345678901" },
  { id: "CUST12019", name: "Amit Patel", phone: "+91 9456789012" },
  { id: "CUST12020", name: "Sneha Gupta", phone: "+91 9567890123" },
  { id: "CUST12021", name: "Vikram Reddy", phone: "+91 9678901234" },
  { id: "CUST12022", name: "Anjali Nair", phone: "+91 9789012345" },
  { id: "CUST12023", name: "Karthik Kumar", phone: "+91 9890123456" },
  { id: "CUST12024", name: "Divya Menon", phone: "+91 9901234567" },
  { id: "CUST12025", name: "Arjun Kapoor", phone: "+91 9012345678" },
  { id: "CUST12026", name: "Meera Krishnan", phone: "+91 9112345678" },
  { id: "CUST12027", name: "Suresh Iyer", phone: "+91 9223456789" },
  { id: "CUST12028", name: "Lakshmi Prasad", phone: "+91 9334567890" },
  { id: "CUST12029", name: "Ravi Verma", phone: "+91 9445678901" },
  { id: "CUST12030", name: "Pooja Desai", phone: "+91 9556789012" },
];

const categories = ["Electronics", "Clothing", "Food & Beverages", "Home & Garden", "Sports & Outdoors", "Beauty"];
const regions = ["North", "South", "East", "West", "Central"];
const genders = ["Male", "Female"];
const employees = [
  "Harsh Agrawal",
  "Priya Sharma",
  "Rohan Mehta",
  "Deepa Iyer",
  "Suresh Kumar",
  "Anita Joshi",
  "Vikram Malhotra",
  "Kavita Reddy",
];

const products = [
  { id: "PROD0001", category: "Electronics" },
  { id: "PROD0002", category: "Electronics" },
  { id: "PROD0003", category: "Clothing" },
  { id: "PROD0004", category: "Clothing" },
  { id: "PROD0005", category: "Food & Beverages" },
  { id: "PROD0006", category: "Home & Garden" },
  { id: "PROD0007", category: "Sports & Outdoors" },
  { id: "PROD0008", category: "Beauty" },
  { id: "PROD0009", category: "Beauty" },
];

function randomDate(start: Date, end: Date): string {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split("T")[0];
}

function generateTransactions(count: number) {
  const txns = [];
  const startDate = new Date("2023-01-01");
  const endDate = new Date("2023-12-31");

  for (let i = 0; i < count; i++) {
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const product = products[Math.floor(Math.random() * products.length)];
    const quantity = Math.floor(Math.random() * 5) + 1;
    const basePrice = Math.floor(Math.random() * 5000) + 500;
    
    txns.push({
      transactionId: `TXN${String(1000000 + i).slice(1)}`,
      date: randomDate(startDate, endDate),
      customerId: customer.id,
      customerName: customer.name,
      phoneNumber: customer.phone,
      gender: genders[Math.floor(Math.random() * genders.length)],
      age: Math.floor(Math.random() * 45) + 18,
      productCategory: product.category,
      quantity,
      totalAmount: String(basePrice * quantity),
      customerRegion: regions[Math.floor(Math.random() * regions.length)],
      productId: product.id,
      employeeName: employees[Math.floor(Math.random() * employees.length)],
    });
  }

  return txns;
}

async function seed() {
  console.log("Checking existing data...");
  
  const existing = await db.select({ count: sql<number>`count(*)::int` }).from(transactions);
  const existingCount = existing[0]?.count ?? 0;
  
  if (existingCount > 0) {
    console.log(`Database already has ${existingCount} transactions. Skipping seed.`);
    return;
  }

  console.log("Seeding database with sample transactions...");
  
  const txns = generateTransactions(150);
  
  const batchSize = 50;
  for (let i = 0; i < txns.length; i += batchSize) {
    const batch = txns.slice(i, i + batchSize);
    await db.insert(transactions).values(batch);
    console.log(`Inserted ${Math.min(i + batchSize, txns.length)}/${txns.length} transactions`);
  }

  console.log("Seeding complete!");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
  });

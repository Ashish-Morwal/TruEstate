import { type User, type InsertUser, type Transaction, type InsertTransaction, transactions } from "./shared/schema";
import { db } from "./db";
import { eq, and, gte, lte, inArray, ilike, sql, asc, desc } from "drizzle-orm";

export interface TransactionFilters {
  regions?: string[];
  genders?: string[];
  categories?: string[];
  ageMin?: number;
  ageMax?: number;
  dateStart?: string;
  dateEnd?: string;
  search?: string;
}

export interface TransactionQuery {
  filters?: TransactionFilters;
  sortBy?: string;
  page?: number;
  pageSize?: number;
}

export interface TransactionResult {
  data: Transaction[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface TransactionStats {
  totalUnits: number;
  totalAmount: number;
  totalDiscount: number;
  transactionCount: number;
}

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getTransactions(query: TransactionQuery): Promise<TransactionResult>;
  getTransactionStats(filters: TransactionFilters): Promise<TransactionStats>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  getFilterOptions(): Promise<{
    regions: string[];
    genders: string[];
    categories: string[];
  }>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    return undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    throw new Error("Not implemented");
  }

  async getTransactions(query: TransactionQuery): Promise<TransactionResult> {
    const { filters = {}, sortBy = "date_desc", page = 1, pageSize = 10 } = query;
    
    const conditions = [];
    
    if (filters.regions && filters.regions.length > 0) {
      conditions.push(inArray(transactions.customerRegion, filters.regions));
    }
    
    if (filters.genders && filters.genders.length > 0) {
      conditions.push(inArray(transactions.gender, filters.genders));
    }
    
    if (filters.categories && filters.categories.length > 0) {
      conditions.push(inArray(transactions.productCategory, filters.categories));
    }
    
    if (filters.ageMin !== undefined) {
      conditions.push(gte(transactions.age, filters.ageMin));
    }
    
    if (filters.ageMax !== undefined) {
      conditions.push(lte(transactions.age, filters.ageMax));
    }
    
    if (filters.dateStart) {
      conditions.push(gte(transactions.date, filters.dateStart));
    }
    
    if (filters.dateEnd) {
      conditions.push(lte(transactions.date, filters.dateEnd));
    }
    
    if (filters.search) {
      conditions.push(
        sql`(${transactions.customerName} ILIKE ${`%${filters.search}%`} OR ${transactions.transactionId} ILIKE ${`%${filters.search}%`} OR ${transactions.customerId} ILIKE ${`%${filters.search}%`})`
      );
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    let orderByClause;
    switch (sortBy) {
      case "date_desc":
        orderByClause = desc(transactions.date);
        break;
      case "date_asc":
        orderByClause = asc(transactions.date);
        break;
      case "quantity_desc":
        orderByClause = desc(transactions.quantity);
        break;
      case "quantity_asc":
        orderByClause = asc(transactions.quantity);
        break;
      case "customer_asc":
        orderByClause = asc(transactions.customerName);
        break;
      case "customer_desc":
        orderByClause = desc(transactions.customerName);
        break;
      case "amount_desc":
        orderByClause = desc(transactions.totalAmount);
        break;
      case "amount_asc":
        orderByClause = asc(transactions.totalAmount);
        break;
      default:
        orderByClause = desc(transactions.date);
    }

    const offset = (page - 1) * pageSize;

    const [data, countResult] = await Promise.all([
      db
        .select()
        .from(transactions)
        .where(whereClause)
        .orderBy(orderByClause)
        .limit(pageSize)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)::int` })
        .from(transactions)
        .where(whereClause),
    ]);

    const total = countResult[0]?.count ?? 0;

    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const [result] = await db.insert(transactions).values(transaction).returning();
    return result;
  }

  async getTransactionStats(filters: TransactionFilters): Promise<TransactionStats> {
    const conditions = [];
    
    if (filters.regions && filters.regions.length > 0) {
      conditions.push(inArray(transactions.customerRegion, filters.regions));
    }
    
    if (filters.genders && filters.genders.length > 0) {
      conditions.push(inArray(transactions.gender, filters.genders));
    }
    
    if (filters.categories && filters.categories.length > 0) {
      conditions.push(inArray(transactions.productCategory, filters.categories));
    }
    
    if (filters.ageMin !== undefined) {
      conditions.push(gte(transactions.age, filters.ageMin));
    }
    
    if (filters.ageMax !== undefined) {
      conditions.push(lte(transactions.age, filters.ageMax));
    }
    
    if (filters.dateStart) {
      conditions.push(gte(transactions.date, filters.dateStart));
    }
    
    if (filters.dateEnd) {
      conditions.push(lte(transactions.date, filters.dateEnd));
    }
    
    if (filters.search) {
      conditions.push(
        sql`(${transactions.customerName} ILIKE ${`%${filters.search}%`} OR ${transactions.transactionId} ILIKE ${`%${filters.search}%`} OR ${transactions.customerId} ILIKE ${`%${filters.search}%`})`
      );
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [result] = await db
      .select({
        totalUnits: sql<number>`COALESCE(SUM(${transactions.quantity}), 0)::int`,
        totalAmount: sql<number>`COALESCE(SUM(${transactions.totalAmount}::numeric), 0)::numeric`,
        transactionCount: sql<number>`COUNT(*)::int`,
      })
      .from(transactions)
      .where(whereClause);

    const totalAmount = Number(result?.totalAmount ?? 0);

    return {
      totalUnits: result?.totalUnits ?? 0,
      totalAmount,
      totalDiscount: Math.round(totalAmount * 0.15),
      transactionCount: result?.transactionCount ?? 0,
    };
  }

  async getFilterOptions(): Promise<{
    regions: string[];
    genders: string[];
    categories: string[];
  }> {
    const [regionsResult, gendersResult, categoriesResult] = await Promise.all([
      db.selectDistinct({ value: transactions.customerRegion }).from(transactions).where(sql`${transactions.customerRegion} IS NOT NULL`),
      db.selectDistinct({ value: transactions.gender }).from(transactions).where(sql`${transactions.gender} IS NOT NULL`),
      db.selectDistinct({ value: transactions.productCategory }).from(transactions).where(sql`${transactions.productCategory} IS NOT NULL`),
    ]);

    return {
      regions: regionsResult.map(r => r.value).filter(Boolean) as string[],
      genders: gendersResult.map(g => g.value).filter(Boolean) as string[],
      categories: categoriesResult.map(c => c.value).filter(Boolean) as string[],
    };
  }
}

export const storage = new DatabaseStorage();

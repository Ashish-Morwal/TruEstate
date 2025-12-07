import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

const safeIntSchema = (defaultValue: number) => 
  z.string()
    .optional()
    .transform((val) => {
      if (!val) return defaultValue;
      const parsed = parseInt(val, 10);
      return isNaN(parsed) || parsed < 1 ? defaultValue : parsed;
    });

const transactionQuerySchema = z.object({
  regions: z.string().optional(),
  genders: z.string().optional(),
  categories: z.string().optional(),
  ageMin: safeIntSchema(0).transform(v => v === 0 ? undefined : v),
  ageMax: safeIntSchema(0).transform(v => v === 0 ? undefined : v),
  dateStart: z.string().optional(),
  dateEnd: z.string().optional(),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  page: safeIntSchema(1),
  pageSize: safeIntSchema(10).transform(v => Math.min(v, 100)),
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get("/api/transactions", async (req, res) => {
    try {
      const parsed = transactionQuerySchema.parse(req.query);
      
      const filters = {
        regions: parsed.regions ? parsed.regions.split(",").filter(Boolean) : undefined,
        genders: parsed.genders ? parsed.genders.split(",").filter(Boolean) : undefined,
        categories: parsed.categories ? parsed.categories.split(",").filter(Boolean) : undefined,
        ageMin: parsed.ageMin,
        ageMax: parsed.ageMax,
        dateStart: parsed.dateStart || undefined,
        dateEnd: parsed.dateEnd || undefined,
        search: parsed.search || undefined,
      };

      const result = await storage.getTransactions({
        filters,
        sortBy: parsed.sortBy || "date_desc",
        page: parsed.page,
        pageSize: parsed.pageSize,
      });

      res.json(result);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ error: "Failed to fetch transactions" });
    }
  });

  app.get("/api/transactions/stats", async (req, res) => {
    try {
      const parsed = transactionQuerySchema.parse(req.query);
      
      const filters = {
        regions: parsed.regions ? parsed.regions.split(",").filter(Boolean) : undefined,
        genders: parsed.genders ? parsed.genders.split(",").filter(Boolean) : undefined,
        categories: parsed.categories ? parsed.categories.split(",").filter(Boolean) : undefined,
        ageMin: parsed.ageMin,
        ageMax: parsed.ageMax,
        dateStart: parsed.dateStart || undefined,
        dateEnd: parsed.dateEnd || undefined,
        search: parsed.search || undefined,
      };

      const stats = await storage.getTransactionStats(filters);

      res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  app.get("/api/filter-options", async (req, res) => {
    try {
      const options = await storage.getFilterOptions();
      res.json(options);
    } catch (error) {
      console.error("Error fetching filter options:", error);
      res.status(500).json({ error: "Failed to fetch filter options" });
    }
  });

  return httpServer;
}

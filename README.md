# TruEstate

A modern full-stack application for managing and visualizing sales transactions. Built with React, TypeScript, and Express.js, featuring advanced filtering, sorting, pagination, and real-time search capabilities on transaction data.

## Tech Stack

**Frontend:** React 18.3, TypeScript, Vite, Tailwind CSS, Shadcn/ui, TanStack React Query, Wouter, Zod

**Backend:** Node.js, Express 4.21, TypeScript, PostgreSQL, Drizzle ORM, Zod

## Search Implementation Summary

Search functionality is implemented in the frontend `SearchBar` component and the backend `storage.ts` module:

- **Frontend**: `src/components/sales/SearchBar.tsx` captures user input and updates filter state
- **Backend**: Query handler in `routes.ts` processes `search` parameter via case-insensitive `ILIKE` SQL operator
- **Behavior**: Searches across customer name, phone number, and employee name fields
- **Performance**: Uses indexed database columns for efficient search queries

## Filter Implementation Summary

Multi-faceted filtering system with the following components:

- **Frontend**: `FilterPanel.tsx` and `FilterCheckboxGroup.tsx` provide UI for selecting filter criteria
- **Backend**: `routes.ts` constructs dynamic WHERE clauses based on filter parameters (regions, genders, categories, age range, date range)
- **Database**: Drizzle ORM builds parameterized SQL queries to prevent injection attacks
- **Supported Filters**: Customer Region, Gender, Product Category, Age Range (Min/Max), Date Range (Start/End)
- **Filter Options Endpoint**: `/api/filter-options` returns available filter values

## Sorting Implementation Summary

Sorting is implemented via dropdown selector with column-based ordering:

- **Frontend**: `SortingDropdown.tsx` allows users to select sort field and direction
- **Backend**: `routes.ts` processes `sortBy` parameter and constructs `ORDER BY` clause using Drizzle ORM
- **Default Sort**: `customer_asc` (customer name ascending)
- **Supported Fields**: Transaction ID, Customer Name, Amount, Discount, Quantity, Date, Gender, Age, Region
- **Direction**: Ascending/Descending toggle in dropdown

## Pagination Implementation Summary

Efficient pagination with adjustable page size:

- **Frontend**: `PaginationControls.tsx` displays page navigation and page size selector
- **Backend**: `routes.ts` implements `LIMIT` and `OFFSET` SQL clauses; `/api/transactions` returns `{ data, total, page, pageSize, totalPages }`
- **Default Page Size**: 10 items per page
- **Max Page Size**: 100 items per page
- **Response Metadata**: Includes total count and calculated totalPages for UI rendering

## Setup Instructions

### Prerequisites
- Node.js v18 or higher
- PostgreSQL database running locally or remote
- npm

### Installation

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd Project-Scaffolder2
   npm install
   ```

2. **Configure environment variables**
   - Backend: `backend/.env` — set `DATABASE_URL` to your PostgreSQL connection string
   - Frontend: `frontend/.env` — set `VITE_API_BASE_URL=http://localhost:5000` (for local dev)

3. **Setup database**
   ```bash
   npm run db:push --workspace=backend
   npm run seed --workspace=backend
   ```

4. **Start development servers**
   - Terminal 1: `npm run dev --workspace=backend` (runs on http://localhost:5000)
   - Terminal 2: `npm run dev --workspace=frontend` (runs on http://localhost:5173)

5. **Access the application**
   - Open browser to `http://localhost:5173`

### Available Scripts

**Root (Monorepo):**
- `npm install` — Install all workspace dependencies
- `npm run dev --workspace=backend` — Start backend dev server
- `npm run dev --workspace=frontend` — Start frontend dev server

**Backend:**
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run db:push` — Sync database schema
- `npm run seed` — Seed database with sample data

**Frontend:**
- `npm run build` — Build production bundle
- `npm run preview` — Preview production build locally

---

For detailed architecture information, see `/docs/architecture.md`.

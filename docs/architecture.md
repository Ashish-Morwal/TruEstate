# Architecture Document

## Overview
This document describes the high-level architecture for the TruEstate sales dashboard: the backend API, the PostgreSQL data store, and the React frontend. It covers components, data flow, schema, deployment notes, and operational concerns.

## Components
- Backend (Express + Drizzle): serves REST endpoints for transactions, users, and lookup data. Database access uses `drizzle-orm` with the schema defined in `backend/src/shared/schema.ts`.
- Database (PostgreSQL): stores `users` and `transactions` tables. Connection via `pg` Pool and `DATABASE_URL` from environment.
- Frontend (React + Vite): single-page app that queries the backend for transactions and provides search, filter, sort, and pagination UI.

## Data Flow
1. Frontend issues HTTP requests to backend endpoints (e.g., `/api/transactions`) with query params for search, filters, sorting, and pagination.
2. Backend validates parameters and constructs parameterized SQL queries using Drizzle to fetch data.
3. Backend returns JSON results plus paging metadata.
4. Frontend renders data and provides interactive controls.

## Database Schema
- `users` table: `id` (varchar, default gen_random_uuid), `username` (text, unique), `password` (text)
- `transactions` table: fields include `id` (serial), `transaction_id`, `date`, `customer_id`, `customer_name`, `phone_number`, `gender`, `age`, `product_category`, `quantity`, `total_amount`, `customer_region`, `product_id`, `employee_name`.

## Migrations & Seeding
- Drizzle config: `backend/drizzle.config.ts` outputs migrations into `backend/migrations` (if used). If migrations are not present, use the generated SQL in `README` or run `drizzle-kit generate` after installing the correct drizzle packages.
- Seeding: `backend/src/seed.ts` programmatically generates and inserts sample transactions. To seed a remote DB, set `DATABASE_URL` to the Render database URL and run `npm run seed` from `backend`.

## Environment & Connection Notes
- Use `DATABASE_URL` environment variable in `backend/.env` or CI deployment settings.
- Remote DBs (Render) often require SSL. The backend config uses the `pg` Pool with SSL enabled when `NODE_ENV=production` (`rejectUnauthorized: false`) to accept typical managed DB certificates.

## Deployment
- Backend: can be deployed to Render, Fly, Heroku, or any Node host. Make sure `DATABASE_URL` is set in service environment variables and `NODE_ENV=production`.
- Frontend: build with `npm run build` and serve static files from the backend or host separately (Vercel, Netlify, Render static site).

## Operational Considerations
- Connection pooling: `pg` Pool is used; tune `max`, `idleTimeoutMillis` for production.
- Backups and migrations: use Render backups or pg_dump for dumps; use drizzle-kit/drizzle-orm migrations for schema changes.
- Secrets: keep DB credentials and other secrets out of source control. Use platform environment variables or a secrets manager.

## Folder Structure (relevant parts)
- `backend/src` — API routes, controllers, services, `db.ts`, `seed.ts`, `shared/schema.ts`
- `frontend/src` — React application and components
- `migrations/` — Drizzle-generated SQL migrations (when present)

## API Endpoints (examples)
- `GET /api/transactions` — query params: `q` (search), `product_category`, `customer_region`, `gender`, `date_from`, `date_to`, `sort_by`, `order`, `page`, `pageSize`
- `POST /api/auth/login` — authenticate users

## Recommendations
- Prefer building in CI and not committing `dist` long-term; for now `dist` is tracked as requested.
- Add health checks and a basic smoke test for the API.

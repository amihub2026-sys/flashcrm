# Frontend Architecture

The CRM is customer-centric. The parent relationship is:

Customer -> AC Unit -> Installation / Service / AMC / EWC -> Reminder -> WhatsApp/Call -> Job -> Parts/Notes -> Invoice -> Next Reminder

Each feature is lazy-loaded through its own `*.routes.ts` file. This keeps every module isolated and ready for module-by-module development. Shared UI belongs under `shared/`; API-independent business types and future API services belong under `core/`.

## Backend phase
When Node.js + Express + MongoDB is started, add API services under `core/services/api/` and keep components dependent on typed models rather than raw API JSON.

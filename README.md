# AC Service Center CRM — Angular Frontend Base

Frontend-first foundation for the AC Service Center CRM planned in ChatGPT.

## Stack
- Angular 22 standalone components
- Lazy-loaded feature routes
- CSS only (no paid UI library)
- Dummy data service for frontend development
- Node.js + Express + MongoDB ready architecture for the backend phase

## Run
```bash
npm install
npm start
```
Open `http://localhost:4200`.

## Main structure
- `core/models` — customer, AC, AMC/EWC, reminder and technician interfaces
- `core/services` — navigation and dummy data
- `shared/components` — reusable page header, stat card and base module UI
- `layout` — CRM sidebar/topbar shell
- `features/*` — one folder per CRM module

## Modules
1. Dashboard
2. Customer Management
3. AC Unit Management
4. Installation Management
5. Service & Complaint Management
6. AMC Management
7. EWC Management
8. Reminder & Follow-up Management
9. WhatsApp & Call Management
10. Technician Management
11. Job Assignment & Scheduling
12. Job Cards & Service History
13. Parts Replacement & Internal Notes
14. Inventory Management
15. Quotation Management
16. Invoice & Payment Management
17. Calendar & Schedule
18. Reports & Analytics
19. Users, Roles & Permissions
20. Settings & Master Data

## Important foundation rule
Customer -> AC Unit -> Installation/AMC/EWC/Service -> Reminder -> Communication -> Technician Job -> Parts/Notes -> Invoice -> Next Reminder.

The current project is intentionally frontend-first. Replace dummy data with API services during the Node.js/MongoDB phase.

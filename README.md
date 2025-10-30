# TicketApp — Multi-framework implementations

This workspace contains three separate frontend implementations for the "Frontend Stage 2 — Multi-Framework Ticket Web App" challenge:

- `react-app` — React + Vite implementation (working, contains mock API and full CRUD flows)
- `vue-app` — placeholder/skeleton to scaffold a Vue + Vite implementation that mirrors the React app
- `twig-app` — placeholder/skeleton to scaffold a PHP + Twig implementation (server-rendered templates)

This folder contains the React scaffold for the TicketApp required by Frontend Stage 2.

## What is included
- Vite + React project with basic routing
- Layout and Hero components using shared-assets/hero-wave.svg
- Auth context (simulated auth via localStorage key `ticketapp_session`)
- Ticket context (CRD implemented, persisted in localStorage key `ticketapp_tickets`)
- Pages: Landing, Login, Signup, Dashboard, Tickets list

## Prerequisites
- Node.js (>=16) and npm

## Setup & Run (PowerShell)
```powershell
cd "react-app"
npm install
npm run dev

Open http://localhost:5173 
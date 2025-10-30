# React implementation — TicketApp (scaffold)

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
```
Open http://localhost:5173

## Notes
- Authentication is simulated and stored in localStorage under `ticketapp_session`.
- Ticket CRUD persists to localStorage under `ticketapp_tickets`.
- This is a scaffold: forms and components are minimal and meant as a starting point for implementing the full validation, toasts, and error handling required by the challenge.

## Example test credential
- Email: demo@example.com (any email will log in)

## Next steps (recommended)
- Add react-hot-toast to show toasts on success/error.
- Implement inline validation rules per spec (title required, status must be open|in_progress|closed).
- Add confirmation dialog for deletes and protected-route messaging when session expires.

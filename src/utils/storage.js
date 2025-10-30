export const SESSION_KEY = 'ticketapp_session'
export const TICKETS_KEY = 'ticketapp_tickets'
export function read(key){ try { return JSON.parse(localStorage.getItem(key)) } catch { return null } }
export function write(key, val){ localStorage.setItem(key, JSON.stringify(val)) }
export function remove(key){ localStorage.removeItem(key) }


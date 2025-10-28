const TICKETS_KEY = 'ticketapp_tickets'

function readTickets(){
  try { return JSON.parse(localStorage.getItem(TICKETS_KEY) || '[]') } catch { return [] }
}

function writeTickets(tickets){
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets))
}

function simulate(delay = 300, failureRate = 0.05){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < failureRate) reject(new Error('Simulated network error'))
      else resolve()
    }, delay + Math.random() * delay)
  })
}

export async function apiGetTickets(){
  await simulate(200, 0.05)
  return readTickets()
}

export async function apiCreateTicket(payload){
  await simulate(300, 0.05)
  const tickets = readTickets()
  const t = { id: `t-${Date.now()}`, ...payload, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
  tickets.unshift(t)
  writeTickets(tickets)
  return t
}

export async function apiUpdateTicket(id, data){
  await simulate(250, 0.05)
  const tickets = readTickets()
  const idx = tickets.findIndex(t=>t.id===id)
  if(idx === -1) throw new Error('Ticket not found')
  tickets[idx] = { ...tickets[idx], ...data, updatedAt: new Date().toISOString() }
  writeTickets(tickets)
  return tickets[idx]
}

export async function apiDeleteTicket(id){
  await simulate(200, 0.05)
  const tickets = readTickets()
  const next = tickets.filter(t=>t.id!==id)
  writeTickets(next)
  return true
}

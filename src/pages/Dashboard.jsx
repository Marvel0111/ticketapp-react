import React from 'react'
import { useTickets } from '../contexts/TicketContext'

export default function Dashboard(){
  const { tickets } = useTickets()
  const total = tickets.length
  const open = tickets.filter(t=>t.status==='open').length
  const closed = tickets.filter(t=>t.status==='closed').length

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <div className="grid grid-3">
        <div className="card">
          <h3>Total tickets</h3>
          <p>{total}</p>
        </div>
        <div className="card">
          <h3>Open</h3>
          <p>{open}</p>
        </div>
        <div className="card">
          <h3>Resolved (closed)</h3>
          <p>{closed}</p>
        </div>
      </div>
    </div>
  )
}

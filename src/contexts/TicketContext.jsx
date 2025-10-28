import React, { createContext, useContext, useEffect, useState } from 'react'
import { apiGetTickets, apiCreateTicket, apiUpdateTicket, apiDeleteTicket } from '../utils/mockApi'

const TicketContext = createContext()

export function TicketProvider({ children }){
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    let mounted = true
    setLoading(true)
    apiGetTickets()
      .then(list => { if(mounted) setTickets(list) })
      .catch(()=>{ if(mounted) setTickets([]) })
      .finally(()=>{ if(mounted) setLoading(false) })
    return ()=> mounted = false
  },[])

  async function createTicket(payload){
    // call API and update state
    const t = await apiCreateTicket(payload)
    setTickets(prev => [t, ...prev])
    return t
  }

  async function updateTicket(id, data){
    const updated = await apiUpdateTicket(id, data)
    setTickets(prev=>prev.map(t=> t.id===id ? updated : t))
    return updated
  }

  async function deleteTicket(id){
    await apiDeleteTicket(id)
    setTickets(prev=>prev.filter(t=>t.id!==id))
    return true
  }

  return (
    <TicketContext.Provider value={{ tickets, loading, createTicket, updateTicket, deleteTicket }}>
      {children}
    </TicketContext.Provider>
  )
}

export function useTickets(){
  return useContext(TicketContext)
}

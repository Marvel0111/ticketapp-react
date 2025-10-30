import React, { useState } from 'react'
import { useTickets } from '../../contexts/TicketContext'
import toast from 'react-hot-toast'
import ConfirmDialog from '../../components/ConfirmDialog'
import EditDialog from '../../components/EditDialog'

function StatusTag({status}){
  return <span className={`status ${status.replace(/\s+/g,'_')}`}>{status.replace('_',' ')}</span>
}

export default function TicketList(){
  const { tickets, loading, createTicket, updateTicket, deleteTicket } = useTickets()
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('open')
  const [error, setError] = useState('')
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [toDelete, setToDelete] = useState(null)
  const [editingTicket, setEditingTicket] = useState(null)

  async function handleCreate(e){
    e.preventDefault()
    if(!title) { setError('Title is required'); return }
    if(!['open','in_progress','closed'].includes(status)){ setError('Invalid status'); return }
    setError('')
    try{
      await createTicket({ title, status })
      setTitle('')
      setStatus('open')
      toast.success('Ticket created')
    }catch(err){
      toast.error(err.message || 'Failed to create ticket. Please retry.')
    }
  }

  function confirmDelete(ticket){
    setToDelete(ticket)
    setConfirmOpen(true)
  }

  function handleCancel(){
    setToDelete(null)
    setConfirmOpen(false)
  }

  async function handleConfirm(){
    if(!toDelete) return
    try{
      await deleteTicket(toDelete.id)
      toast.success('Ticket deleted')
    }catch(err){
      toast.error(err.message || 'Failed to delete ticket. Please retry.')
    }finally{
      setToDelete(null)
      setConfirmOpen(false)
    }
  }

  return (
    <div>
      <h2>Tickets</h2>
      <section className="card" style={{marginBottom:16}}>
        <form onSubmit={handleCreate}>
          <div style={{display:'flex',gap:8}}>
            <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} style={{flex:1}} />
            <select value={status} onChange={e=>setStatus(e.target.value)}>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            <button type="submit">Create</button>
          </div>
          {error && <div style={{color:'red'}}>{error}</div>}
        </form>
      </section>

      <section className="grid">
        {loading && <div className="card">Loading tickets…</div>}
        {!loading && tickets.length===0 && <div className="card">No tickets yet. Create one above.</div>}
        {tickets.map(t=> (
          <div key={t.id} className="ticket-card">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <h4>{t.title}</h4>
              <StatusTag status={t.status} />
            </div>
            <p style={{color:'#6b7280'}}>{t.description}</p>
            <div style={{marginTop:8}}>
              <button onClick={async ()=>{ try{ const next = t.status==='open'?'in_progress': t.status==='in_progress'?'closed':'open'; await updateTicket(t.id,{status:next}); toast.success('Status updated') }catch(err){ toast.error(err.message||'Failed to update status') } }}>Advance</button>
              <button onClick={()=>setEditingTicket(t)} style={{marginLeft:8}}>Edit</button>
              <button onClick={()=>confirmDelete(t)} style={{marginLeft:8,color:'#b91c1c'}}>Delete</button>
            </div>
          </div>
        ))}
      </section>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete ticket"
        message={toDelete ? `Are you sure you want to delete "${toDelete.title}"? This action cannot be undone.` : ''}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <EditDialog open={!!editingTicket} ticket={editingTicket} onClose={()=>setEditingTicket(null)} onSave={async (vals)=>{
        try{
          await updateTicket(editingTicket.id, vals)
          toast.success('Ticket updated')
        }catch(err){
          toast.error(err.message||'Failed to update ticket')
        }
      }} />
    </div>
  )
}

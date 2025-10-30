import React, { useEffect, useRef } from 'react'
import TicketForm from './TicketForm'

export default function EditDialog({ open, ticket, onClose, onSave }){
  const overlayRef = useRef(null)
  const previouslyFocused = useRef(null)

  useEffect(()=>{
    function handleKey(e){ 
      if(e.key === 'Escape' && onClose) onClose() 
    }
    if(open){
      previouslyFocused.current = document.activeElement
      document.addEventListener('keydown', handleKey)
      // focus first focusable inside dialog (form input)
      setTimeout(()=>{
        const el = overlayRef.current?.querySelector('input,select,button')
        el && el.focus()
      },0)
      return ()=>{
        document.removeEventListener('keydown', handleKey)
        previouslyFocused.current && previouslyFocused.current.focus()
      }
    }
  },[open, onClose])

  if(!open) return null

  return (
    <div 
      className="confirm-overlay" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="edit-title"
      ref={overlayRef}
      onClick={e => {
        // Close when clicking overlay background
        if(e.target === e.currentTarget) onClose()
      }}
    >
      <div className="confirm-card" style={{maxWidth:640}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
          <h3 id="edit-title">Edit ticket</h3>
          <button className="btn btn-icon" onClick={onClose} aria-label="Close dialog">×</button>
        </div>
        <TicketForm 
          initial={ticket} 
          onSubmit={async (vals)=>{ 
            await onSave(vals)
            onClose() 
          }} 
          onCancel={onClose} 
          submitLabel="Save changes" 
        />
      </div>
    </div>
  )
}

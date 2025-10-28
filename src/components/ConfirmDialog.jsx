import React, { useEffect, useRef } from 'react'

export default function ConfirmDialog({ open, title = 'Confirm', message = '', onConfirm, onCancel }) {
  const overlayRef = useRef(null)
  const previouslyFocused = useRef(null)

  useEffect(()=>{
    function handleKey(e){ if(e.key === 'Escape') onCancel && onCancel() }
    if(open){
      previouslyFocused.current = document.activeElement
      document.addEventListener('keydown', handleKey)
      // focus first focusable inside dialog
      setTimeout(()=>{
        const el = overlayRef.current && overlayRef.current.querySelector('button')
        el && el.focus()
      },0)
      return ()=>{
        document.removeEventListener('keydown', handleKey)
        previouslyFocused.current && previouslyFocused.current.focus()
      }
    }
  },[open,onCancel])

  if (!open) return null
  return (
    <div className="confirm-overlay" role="dialog" aria-modal="true" aria-labelledby="confirm-title" ref={overlayRef}>
      <div className="confirm-card">
        <h3 id="confirm-title">{title}</h3>
        <p style={{color:'#374151'}}>{message}</p>
        <div style={{display:'flex',justifyContent:'flex-end',gap:8,marginTop:16}}>
          <button className="btn" onClick={onCancel}>Cancel</button>
          <button className="btn btn-primary" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import { validateTicket } from '../utils/validators'

export default function TicketForm({ initial = {}, onSubmit, onCancel, submitLabel = 'Save' }){
  const [values, setValues] = useState({
    title: initial.title || '',
    description: initial.description || '',
    status: initial.status || 'open',
    priority: initial.priority || 'medium'
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(()=>{
    setValues({ title: initial.title || '', description: initial.description || '', status: initial.status || 'open', priority: initial.priority || 'medium' })
    setErrors({})
  },[initial])

  function handleChange(e){
    const { name, value } = e.target
    setValues(v => ({ ...v, [name]: value }))
  }

  async function handleSubmit(e){
    e.preventDefault()
    const v = validateTicket(values)
    if(Object.keys(v).length){ setErrors(v); return }
    setSubmitting(true)
    try{
      await onSubmit(values)
    }finally{
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="form-group">
        <label className="form-label" htmlFor="title">Title</label>
        <input id="title" name="title" className={`form-input ${errors.title? 'form-input-error':''}`} value={values.title} onChange={handleChange} />
        {errors.title && <div className="error-text">{errors.title}</div>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="status">Status</label>
        <select id="status" name="status" className={`form-input ${errors.status? 'form-input-error':''}`} value={values.status} onChange={handleChange}>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
        {errors.status && <div className="error-text">{errors.status}</div>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="priority">Priority</label>
        <select id="priority" name="priority" className="form-input" value={values.priority} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="description">Description</label>
        <textarea id="description" name="description" className={`form-input ${errors.description? 'form-input-error':''}`} rows={4} value={values.description} onChange={handleChange} />
        {errors.description && <div className="error-text">{errors.description}</div>}
      </div>

      <div style={{display:'flex',justifyContent:'flex-end',gap:8}}>
        <button type="button" className="btn" onClick={onCancel} disabled={submitting}>Cancel</button>
        <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting? 'Saving...' : submitLabel}</button>
      </div>
    </form>
  )
}
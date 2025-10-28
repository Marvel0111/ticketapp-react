export function validateEmail(email){
  if(!email) return 'Email is required.'
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if(!re.test(email)) return 'Please enter a valid email address.'
  return null
}

export function validatePassword(password){
  if(!password) return 'Password is required.'
  if(password.length < 6) return 'Password must be at least 6 characters.'
  return null
}

export function validateTicket(values){
  const errors = {}
  if(!values.title || values.title.trim().length === 0) errors.title = 'Title is required.'
  else if(values.title.trim().length < 3) errors.title = 'Title must be at least 3 characters.'
  else if(values.title.trim().length > 120) errors.title = 'Title must be 120 characters or less.'

  const allowed = ['open','in_progress','closed']
  if(!values.status || !allowed.includes(values.status)) errors.status = 'Status must be open, in_progress, or closed.'

  if(values.description && values.description.length > 2000) errors.description = 'Description is too long (max 2000 chars).'

  if(values.priority && !['low','medium','high'].includes(values.priority)) errors.priority = 'Priority must be low, medium or high.'

  return errors
}

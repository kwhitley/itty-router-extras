import { error } from './error'

export const missing = (message = 'Not found.') => error(404, message)

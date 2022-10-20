export class StatusError extends Error {
  constructor(public status = 500, message = 'Internal Error.') {
    super(message)
    this.name = 'StatusError'
    this.status = status
  }
}

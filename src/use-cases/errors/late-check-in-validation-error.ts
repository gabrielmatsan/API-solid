export class LateCheckInValidationError extends Error {
  constructor() {
    super('Check-in can only be valid up to 20 minutes after its creation')
  }
}

export class MaxNumberOfCheckIns extends Error {
  constructor() {
    super('Maximum number of daily checks reached')
  }
}

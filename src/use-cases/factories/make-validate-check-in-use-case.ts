import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { CheckInValidateUseCase } from '../validate-check-in'

export function makeValidateCheckInUseCase() {
  const checksInsRepository = new PrismaCheckInsRepository()
  const useCase = new CheckInValidateUseCase(checksInsRepository)

  return useCase
}

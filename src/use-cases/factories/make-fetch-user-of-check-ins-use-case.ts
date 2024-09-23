import { FetchUserOfCheckInsUseCase } from '../fetch-user-of-check-ins'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeFetchCheckInsUseCase() {
  const checksInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserOfCheckInsUseCase(checksInsRepository)

  return useCase
}

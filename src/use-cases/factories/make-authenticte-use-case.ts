import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const UsersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticUseCase(UsersRepository)

  return authenticateUseCase
}

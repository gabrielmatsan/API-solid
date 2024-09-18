import type { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCasesRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCasesRequest) {
    const userEmailCheks = await this.usersRepository.findByEmail(email)

    if (userEmailCheks) {
      throw new Error('E-mail already used')
    }

    const password_hash = await hash(password, 6)

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}

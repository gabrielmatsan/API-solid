import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repositoy'
import { AuthenticUseCase } from './authentic'
import { InvalidCredentialsError } from './errors/invalid-credentials-erros'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticUseCase
describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticUseCase(usersRepository)
  })
  // Unit test
  it('should be able to authenticate', async () => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticUseCase(usersRepository)

    await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password_hash: await hash('flamengo', 6),
    })

    const { user } = await sut.execute({
      email: 'john.doe@gmail.com',
      password: 'flamengo',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('shouldn`t be able to authenticate with wrong email', async () => {
    expect(() =>
      sut.execute({
        email: 'john.doe@gmail.com',
        password: 'flamego',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('shouldn`t be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password_hash: await hash('flamengo', 6),
    })

    expect(() =>
      sut.execute({
        email: 'john.doe@gmail.com',
        password: 'palmeiras',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})

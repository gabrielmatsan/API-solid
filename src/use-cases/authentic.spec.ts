import { describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repositoy'
import { AuthenticUseCase } from './authentic'
import { InvalidCredentialsError } from './errors/invalid-credentials-erros'

describe('Authenticate Use Case', () => {
  // Unit test
  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticUseCase(usersRepository)

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
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticUseCase(usersRepository)

    expect(() =>
      sut.execute({
        email: 'john.doe@gmail.com',
        password: 'flamego',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('shouldn`t be able to authenticate with wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticUseCase(usersRepository)

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

import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { GymUseCases } from './create-gym'

// Starts the variables
let gymsRepository: InMemoryGymsRepository
let sut: GymUseCases
describe('Register user space', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new GymUseCases(gymsRepository)
  })

  it('should be able to register a gym', async () => {
    const { gym } = await sut.execute({
      title: 'Smart Fit Belem',
      description: null,
      phone: null,
      latitude: -1.4461253,
      longitude: -48.507741,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})

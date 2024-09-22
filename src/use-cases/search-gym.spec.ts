import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

// Starts the variables
let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase
describe('Search Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to seek gyms by the name', async () => {
    await gymsRepository.create({
      title: 'Smart Fit Belem',
      description: null,
      phone: null,
      latitude: -1.4461253,
      longitude: -48.507741,
    })

    await gymsRepository.create({
      title: 'Infinity Academia',
      description: null,
      phone: null,
      latitude: -1.4461253,
      longitude: -48.507741,
    })

    const { gyms } = await sut.execute({
      query: 'Infinity',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Infinity Academia' }),
    ])
  })

  it('should be able to fetch paginated gyms searc', async () => {
    for (let i = 1; i < 23; i++) {
      await gymsRepository.create({
        title: `Infinity Academia ${i}`,
        description: null,
        phone: null,
        latitude: -1.4461253,
        longitude: -48.507741,
      })
    }

    const { gyms } = await sut.execute({ query: 'Infinity', page: 2 })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Infinity Academia 21' }),
      expect.objectContaining({ title: 'Infinity Academia 22' }),
    ])
  })
})

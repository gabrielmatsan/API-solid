import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckIns } from './errors/max-numbers-of-check-ins'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'Smart Fit Belem',
      description: '',
      phone: '',
      latitude: -1.4461253,
      longitude: -48.507741,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })
  // Unit test
  it('should be able to check in', async () => {
    // Creating gym before tests
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -1.4461253,
      userLongitude: -48.507741,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  // aplicando TDD, red, green and refactor
  it('should not be able to check in twice the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -1.4461253,
      userLongitude: -48.507741,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -1.4461253,
        userLongitude: -48.507741,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckIns)
  })

  it('should be able to create two check-ins on different dates', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -1.4461253,
      userLongitude: -48.507741,
    })
    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -1.4461253,
      userLongitude: -48.507741,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in at distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Smart Fit Belem',
      description: '',
      phone: '',
      latitude: new Decimal(-1.4548992),
      longitude: new Decimal(-48.4812964),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -1.4461253,
        userLongitude: -48.507741,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})

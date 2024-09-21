import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface GymUseCasesRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface GymUseCasesResponse {
  gym: Gym
}

export class GymUseCases {
  constructor(private gymRepository: GymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: GymUseCasesRequest): Promise<GymUseCasesResponse> {
    const gym = await this.gymRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })
    return {
      gym,
    }
  }
}

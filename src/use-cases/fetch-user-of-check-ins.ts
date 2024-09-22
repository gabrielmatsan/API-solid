import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface FetchUserOfCheckInsUseCaseRequest {
  userId: string
  page: number
}

interface FetchUserOfCheckInsUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserOfCheckInsUseCase {
  constructor(private checksInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserOfCheckInsUseCaseRequest): Promise<FetchUserOfCheckInsUseCaseResponse> {
    const checkIns = await this.checksInsRepository.findManyByUserCheckIns(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}

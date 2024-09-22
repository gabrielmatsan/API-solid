import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import dayjs from 'dayjs'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'

interface CheckInValidateUseCaseRequest {
  checkInId: string
}

interface CheckInValidateUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInValidateUseCase {
  constructor(private checksRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: CheckInValidateUseCaseRequest): Promise<CheckInValidateUseCaseResponse> {
    const checkIn = await this.checksRepository.findByCheckInId(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()

    await this.checksRepository.save(checkIn)

    return { checkIn }
  }
}

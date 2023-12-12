import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface GetUserMetricsUseCaseClassRequest {
  userId: string
}
interface GetUserMetricsUseCaseClassResponse {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseClassRequest): Promise<GetUserMetricsUseCaseClassResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}

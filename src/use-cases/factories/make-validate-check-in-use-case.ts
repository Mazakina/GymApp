import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckInUseCase } from '../validate-check-in'

export function makeValidateCheeckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const UseCase = new ValidateCheckInUseCase(checkInsRepository)

  return UseCase
}

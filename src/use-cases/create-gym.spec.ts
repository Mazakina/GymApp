import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })
  it('should be able to register', async () => {
    const { gym } = await sut.execute({
      title: 'TypeScript Gym',
      description: null,
      phone: null,
      latitude: -23.5483836,
      longitude: -46.1926104,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})

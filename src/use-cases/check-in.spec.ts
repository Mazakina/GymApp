import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'

let checkInRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-In Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInRepository, gymsRepository)
    vi.useFakeTimers()

    await gymsRepository.create({
      id: 'gym-01',
      title: 'JS-Gym',
      description: '',
      phone: '',
      latitude: -23.5483836,
      longitude: -46.1926104,
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.5483836,
      userLongitude: -46.1926104,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice a day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.5483836,
      userLongitude: -46.1926104,
    })
    await expect(
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -23.5483836,
        userLongitude: -46.1926104,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.5483836,
      userLongitude: -46.1926104,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.5483836,
      userLongitude: -46.1926104,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant Gym', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    gymsRepository.items.push({
      id: 'gym-02',
      title: 'JS-Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-23.5483836),
      longitude: new Decimal(-46.1926104),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -23.5012096,
        userLongitude: -46.5240064,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})

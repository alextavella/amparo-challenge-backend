import { SearchPatientsByNameRepository } from '@/data/db'
import { SearchPatientsByNameService } from '@/data/usecases'
import { SearchPatientsByName } from '@/domain/usecases'
import { FakePatientMemoryRepository } from '@/tests/infra'

let searchPatientsByName: SearchPatientsByName
let fakePatientMemoryRepository: FakePatientMemoryRepository

describe('SearchPatientsByNameService', () => {
  beforeEach(() => {
    fakePatientMemoryRepository = new FakePatientMemoryRepository()
    searchPatientsByName = new SearchPatientsByNameService(
      fakePatientMemoryRepository as SearchPatientsByNameRepository,
    )
  })

  it('should be able search patients by name', async () => {
    await fakePatientMemoryRepository.create({ name: 'Alex', cpf: '' })
    const patients = await searchPatientsByName.search('al')
    expect(patients.length).toBe(1)
  })

  it('should return empty list when empty term', async () => {
    await fakePatientMemoryRepository.create({ name: 'Alex', cpf: '' })
    const patients = await searchPatientsByName.search('')
    expect(patients.length).toBe(0)
  })
})

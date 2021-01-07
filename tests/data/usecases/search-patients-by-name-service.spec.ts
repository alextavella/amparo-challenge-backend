import { SearchPatientsByNameService } from '@/data/usecases'
import { SearchPatientsByNameRepository } from '@/domain/db'
import { SearchPatientsByName } from '@/domain/usecases'
import { FakePatientMemoryRepository } from '@/tests/infra'

let service: SearchPatientsByName
let repository: FakePatientMemoryRepository

describe('SearchPatientsByNameService', () => {
  beforeEach(() => {
    repository = new FakePatientMemoryRepository()
    service = new SearchPatientsByNameService(
      repository as SearchPatientsByNameRepository,
    )
  })

  it('should be able search patients by name', async () => {
    await repository.create({ name: 'Alex', cpf: '' })

    const patients = await service.search('al')

    expect(patients.length).toBe(1)
  })
})

import { SearchPatientsByNameOrCpfRepository } from '@/data/db'
import { SearchPatientsByNameOrCpfService } from '@/data/usecases'
import { CreatePatients, SearchPatientsByNameOrCpf } from '@/domain/usecases'
import { FakePatientMemoryRepository } from '@/tests/infra'

let searchPatientsByNameOrCpf: SearchPatientsByNameOrCpf
let fakePatientMemoryRepository: FakePatientMemoryRepository

const makePacientForCreate = (
  name = 'nome paciente',
  cpf = '213.456.987-92',
): CreatePatients.Model => ({
  name,
  cpf,
})

describe('SearchPatientsByNameOrCpfService', () => {
  beforeEach(() => {
    fakePatientMemoryRepository = new FakePatientMemoryRepository()
    searchPatientsByNameOrCpf = new SearchPatientsByNameOrCpfService(
      fakePatientMemoryRepository as SearchPatientsByNameOrCpfRepository,
    )
  })

  it('should be able search patients by name', async () => {
    const patient = makePacientForCreate()
    await fakePatientMemoryRepository.create(patient)
    const patients = await searchPatientsByNameOrCpf.search('pac')
    expect(patients.length).toBe(1)
    expect(patients[0].name).toEqual(patient.name)
    expect(patients[0].cpf).toEqual(patient.cpf)
  })

  it('should be able search many patients by name', async () => {
    await fakePatientMemoryRepository.create(makePacientForCreate('paciente 1'))
    await fakePatientMemoryRepository.create(makePacientForCreate('paciente 2'))
    const patients = await searchPatientsByNameOrCpf.search('pac')
    expect(patients.length).toBe(2)
  })

  it('should be able search patients by cpf', async () => {
    const patient = makePacientForCreate()
    await fakePatientMemoryRepository.create(patient)
    const patients = await searchPatientsByNameOrCpf.search('456-9')
    expect(patients.length).toBe(1)
    expect(patients[0].name).toEqual(patient.name)
    expect(patients[0].cpf).toEqual(patient.cpf)
  })

  it('should be able search many patients by cpf', async () => {
    await fakePatientMemoryRepository.create(makePacientForCreate('paciente 1'))
    await fakePatientMemoryRepository.create(makePacientForCreate('paciente 2'))
    await fakePatientMemoryRepository.create(makePacientForCreate('paciente 3'))
    const patients = await searchPatientsByNameOrCpf.search('456-9')
    expect(patients.length).toBe(3)
  })

  it('should return empty list when empty term', async () => {
    await fakePatientMemoryRepository.create(makePacientForCreate())
    const patients = await searchPatientsByNameOrCpf.search('')
    expect(patients.length).toBe(0)
  })
})

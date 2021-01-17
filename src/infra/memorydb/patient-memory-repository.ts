import {
  CreatePatientRepository,
  LoadPatientByCpfRepository,
  LoadPatientByIdRepository,
  SearchPatientsByNameOrCpfRepository,
} from '@/data/db'
import { Patient } from '@/domain/models'
import { CreatePatients } from '@/domain/usecases'
import { Collection, MemoryDb } from './db'

export class PatientMemoryRepository
  implements
    CreatePatientRepository,
    LoadPatientByIdRepository,
    LoadPatientByCpfRepository,
    SearchPatientsByNameOrCpfRepository {
  // eslint-disable-next-line @typescript-eslint/prefer-readonly
  protected collection: Collection

  constructor(collectionName = 'patients') {
    this.collection = MemoryDb.collection<Patient>(collectionName)
  }

  async create(model: CreatePatients.Model): Promise<Patient> {
    const entity = await this.collection.add(model)
    return Promise.resolve(entity as Patient)
  }

  async searchByNameOrCpf(term: string): Promise<Patient[]> {
    const formatWord = (word: string) =>
      word.toLowerCase().replace(/[^\d\w+]/g, '')
    const termFormatted = formatWord(term)
    const entities = await this.collection.filter(
      (p: Patient) =>
        formatWord(p.name.toLowerCase()).includes(termFormatted) ||
        formatWord(p.cpf).includes(termFormatted),
    )
    return Promise.resolve(entities as Patient[])
  }

  async load(id: string): Promise<Patient | undefined> {
    const entity = await this.collection.find((p: Patient) => p.id === id)
    return Promise.resolve(entity as Patient)
  }

  async loadByCpf(cpf: string): Promise<Patient | undefined> {
    const formatWord = (word: string) =>
      word.toLowerCase().replace(/[^\d]/g, '')
    const entity = await this.collection.find(
      (p: Patient) => formatWord(p.cpf) === formatWord(cpf),
    )
    return Promise.resolve(entity as Patient)
  }
}

import {
  CreatePatientRepository,
  LoadPatientByIdRepository,
  SearchPatientsByNameRepository,
} from '@/data/db'
import { Patient } from '@/domain/models'
import { CreatePatients } from '@/domain/usecases'
import { Collection, MemoryDb } from './db'

export class PatientMemoryRepository
  implements
    CreatePatientRepository,
    SearchPatientsByNameRepository,
    LoadPatientByIdRepository {
  // eslint-disable-next-line @typescript-eslint/prefer-readonly
  protected collection: Collection

  constructor(collectionName = 'patients') {
    this.collection = MemoryDb.collection<Patient>(collectionName)
  }

  async create(model: CreatePatients.Model): Promise<Patient> {
    const entity = await this.collection.add(model)
    return Promise.resolve(entity as Patient)
  }

  async searchByName(name: string): Promise<Patient[]> {
    const entities = await this.collection.filter((p: Patient) =>
      p.name.toLowerCase().includes(name.toLowerCase()),
    )
    return Promise.resolve(entities as Patient[])
  }

  async load(id: string): Promise<Patient | undefined> {
    const entity = await this.collection.find((p: Patient) => p.id === id)
    return Promise.resolve(entity as Patient)
  }
}

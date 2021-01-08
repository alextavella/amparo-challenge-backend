import {
  CreatePatientRepository,
  LoadPatientByIdRepository,
  SearchPatientsByNameRepository,
} from '@/data/db'
import { PatientEntity } from '@/data/entities'
import { CreatePatients } from '@/domain/usecases'
import { Collection, MemoryDb } from './db'

export class PatientMemoryRepository
  implements
    CreatePatientRepository,
    SearchPatientsByNameRepository,
    LoadPatientByIdRepository {
  protected readonly collection: Collection

  constructor(collectionName = 'patients') {
    this.collection = new MemoryDb<PatientEntity>().collection(collectionName)
  }

  async create(model: CreatePatients.Model): Promise<PatientEntity> {
    const entity = await this.collection.add(model)
    return Promise.resolve(entity as PatientEntity)
  }

  async searchByName(name: string): Promise<PatientEntity[]> {
    const entities = await this.collection.filter((p: PatientEntity) =>
      p.name.toLowerCase().includes(name.toLowerCase()),
    )
    return Promise.resolve(entities as PatientEntity[])
  }

  async load(id: string): Promise<PatientEntity | undefined> {
    const entity = await this.collection.find((p: PatientEntity) => p.id === id)
    return Promise.resolve(entity as PatientEntity)
  }
}

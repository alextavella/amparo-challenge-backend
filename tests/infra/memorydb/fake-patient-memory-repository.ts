import {
  CreatePatientRepository,
  LoadPatientByIdRepository,
  SearchPatientsByNameRepository,
} from '@/data/db'
import { PatientEntity } from '@/data/entities'
import { CreatePatientsService } from '@/data/usecases'
import { FakeMemoryDb } from './fake-db'

export class FakePatientMemoryRepository
  implements
    CreatePatientRepository,
    SearchPatientsByNameRepository,
    LoadPatientByIdRepository {
  private readonly collection = new FakeMemoryDb().collection<PatientEntity>(
    'patients',
  )

  async create(model: CreatePatientsService.Model): Promise<PatientEntity> {
    const entity = this.collection.add(model)
    return Promise.resolve(entity as PatientEntity)
  }

  async searchByName(name: string): Promise<PatientEntity[]> {
    const entities = this.collection.filter((p: PatientEntity) =>
      p.name.toLowerCase().includes(name.toLowerCase()),
    )
    return Promise.resolve(entities as PatientEntity[])
  }

  async load(id: string): Promise<PatientEntity | undefined> {
    const entity = this.collection.find((p: PatientEntity) => p.id === id)
    return Promise.resolve(entity as PatientEntity)
  }
}

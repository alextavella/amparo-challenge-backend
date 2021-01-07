import { PatientEntity } from '@/data/entities/patient'
import {
  CreatePatientsService,
  SearchPatientsByNameService,
} from '@/data/usecases'
import {
  CreatePatientRepository,
  SearchPatientsByNameRepository,
} from '@/domain/db'
import { MemoryDb } from './db'

export class PatientMemoryRepository
  implements CreatePatientRepository, SearchPatientsByNameRepository {
  private readonly collection = new MemoryDb().collection<PatientEntity>(
    'patients',
  )

  async create(
    model: CreatePatientsService.Model,
  ): Promise<CreatePatientsService.Response> {
    const entity = await this.collection.add(model)
    return entity as CreatePatientsService.Response
  }

  async searchByName(
    name: string,
  ): Promise<SearchPatientsByNameService.Response> {
    const entities = await this.collection.filter((p: PatientEntity) =>
      p.name.toLowerCase().includes(name.toLowerCase()),
    )
    return entities as SearchPatientsByNameService.Response
  }
}

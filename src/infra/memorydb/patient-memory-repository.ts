import {
  CreatePatientRepository,
  SearchPatientsByNameRepository,
} from '@/data/db'
import { PatientEntity } from '@/data/entities'
import {
  CreatePatientsService,
  SearchPatientsByNameService,
} from '@/data/usecases'
import { MemoryDb } from './db'

export class PatientMemoryRepository
  implements CreatePatientRepository, SearchPatientsByNameRepository {
  private readonly collection = new MemoryDb().collection<PatientEntity>(
    'patients',
  )

  async create(model: PatientEntity): Promise<CreatePatientsService.Response> {
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

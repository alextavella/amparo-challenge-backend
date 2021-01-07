import { PatientEntity } from '@/data/entities'
import {
  CreatePatientsService,
  SearchPatientsByNameService,
} from '@/data/usecases'
import {
  CreatePatientRepository,
  SearchPatientsByNameRepository,
} from '@/domain/db'
import { SearchPatientsByName } from '@/domain/usecases'
import { FakeMemoryDb } from './fake-db'

export class FakePatientMemoryRepository
  implements CreatePatientRepository, SearchPatientsByNameRepository {
  private readonly collection = new FakeMemoryDb().collection<PatientEntity>(
    'patients',
  )

  async create(
    model: CreatePatientsService.Model,
  ): Promise<CreatePatientsService.Response> {
    const entity = await this.collection.add(model)
    return entity as CreatePatientsService.Response
  }

  async searchByName(name: string): Promise<SearchPatientsByName.Response> {
    const entities = await this.collection.filter((p: PatientEntity) =>
      p.name.toLowerCase().includes(name.toLowerCase()),
    )
    return entities as SearchPatientsByNameService.Response
  }
}

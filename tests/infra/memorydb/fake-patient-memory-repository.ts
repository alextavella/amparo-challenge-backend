import { CreatePatientRepository } from '@/data/db'
import { CreatePatientsService } from '@/data/usecases'
import { FakeMemoryDb } from './fake-db'

export class FakePatientMemoryRepository implements CreatePatientRepository {
  private readonly collection = new FakeMemoryDb().collection<CreatePatientsService.Model>(
    'patients',
  )

  async create(
    model: CreatePatientsService.Model,
  ): Promise<CreatePatientsService.Entity> {
    const entity = await this.collection.add(model)
    return entity as CreatePatientsService.Entity
  }
}

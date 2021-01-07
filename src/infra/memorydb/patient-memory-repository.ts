import { CreatePatientRepository } from '@/data/db'
import { CreatePatientsService } from '@/data/usecases'
import { MemoryDb } from './db'

export class PatientMemoryRepository implements CreatePatientRepository {
  private readonly collection = new MemoryDb().collection<CreatePatientsService.Model>(
    'patients',
  )

  async create(
    model: CreatePatientsService.Model,
  ): Promise<CreatePatientsService.Entity> {
    const entity = await this.collection.add(model)
    return entity as CreatePatientsService.Entity
  }
}

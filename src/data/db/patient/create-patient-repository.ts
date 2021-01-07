import { CreatePatientsService } from '@/data/usecases'

export interface CreatePatientRepository {
  create(
    model: CreatePatientsService.Model,
  ): Promise<CreatePatientsService.Entity>
}

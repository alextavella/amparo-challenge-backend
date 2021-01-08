import { PatientEntity } from '@/data/entities'
import { CreatePatients } from '@/domain/usecases'

export interface CreatePatientRepository {
  create(model: CreatePatients.Model): Promise<PatientEntity>
}

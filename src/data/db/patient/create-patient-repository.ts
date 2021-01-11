import { Patient } from '@/domain/models'
import { CreatePatients } from '@/domain/usecases'

export interface CreatePatientRepository {
  create(model: CreatePatients.Model): Promise<Patient>
}

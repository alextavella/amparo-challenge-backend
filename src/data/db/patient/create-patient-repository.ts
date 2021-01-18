import { Patient } from '@/domain/models'
import { CreatePatients } from '@/domain/usecases'

export interface CreatePatientRepository {
  create(model: CreatePatients.Model): Promise<CreatePatientRepository.Response>
}

export namespace CreatePatientRepository {
  export type Response = Patient
}

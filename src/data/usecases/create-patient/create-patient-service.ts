import { CreatePatientRepository } from '@/data/db'
import { Patient } from '@/domain/models'
import { CreatePatients } from '@/domain/usecases'

export class CreatePatientsService implements CreatePatients {
  constructor(
    private readonly createPatientRepository: CreatePatientRepository,
  ) {}

  async create(model: CreatePatientsService.Model): Promise<Patient> {
    return await this.createPatientRepository.create(model)
  }
}

export namespace CreatePatientsService {
  export type Model = CreatePatients.Model

  export type Entity = {
    id: string
    name: string
    cpf: string
  }
}

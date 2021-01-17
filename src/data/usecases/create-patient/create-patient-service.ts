import { CreatePatientRepository, LoadPatientByCpfRepository } from '@/data/db'
import { PatientDuplicate } from '@/domain/errors'
import { CreatePatients } from '@/domain/usecases'

type Repository = CreatePatientRepository & LoadPatientByCpfRepository

export class CreatePatientsService implements CreatePatients {
  constructor(private readonly repository: Repository) {}

  async create(
    model: CreatePatientsService.Model,
  ): Promise<CreatePatientsService.Response> {
    const patient = await this.repository.loadByCpf(model.cpf)

    if (patient) {
      throw new PatientDuplicate()
    }

    return await this.repository.create(model)
  }
}

export namespace CreatePatientsService {
  export type Model = CreatePatients.Model
  export type Response = CreatePatients.Response
}

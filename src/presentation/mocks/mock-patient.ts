import { Patient } from '@/domain/models'
import { CreatePatients } from '@/domain/usecases/create-patients'
import { v4 as uuid } from 'uuid'

export class CreatePatientsSpy implements CreatePatients {
  params: CreatePatients.Model = {} as CreatePatients.Model

  async create(model: CreatePatients.Model): Promise<Patient> {
    this.params = model
    return Promise.resolve({
      id: uuid(),
      ...model,
    })
  }
}

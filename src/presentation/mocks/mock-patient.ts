import { CreatePatients, SearchPatientsByNameOrCpf } from '@/domain/usecases'
import { v4 as uuid } from 'uuid'

export class CreatePatientsSpy implements CreatePatients {
  params: CreatePatients.Model = {} as CreatePatients.Model

  async create(model: CreatePatients.Model): Promise<CreatePatients.Response> {
    this.params = model
    return Promise.resolve({
      id: uuid(),
      ...model,
    })
  }
}

export class SearchPatientsSpy implements SearchPatientsByNameOrCpf {
  params?: string
  response: SearchPatientsByNameOrCpf.Response = []

  search(name: string): Promise<SearchPatientsByNameOrCpf.Response> {
    this.params = name
    return Promise.resolve(this.response)
  }
}

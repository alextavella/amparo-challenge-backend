import { CreatePatients, SearchPatientsByName } from '@/domain/usecases'
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

export class SearchPatientsSpy implements SearchPatientsByName {
  params?: string

  search(name: string): Promise<SearchPatientsByName.Response> {
    this.params = name
    const response = [] as SearchPatientsByName.Response
    return Promise.resolve(response)
  }
}

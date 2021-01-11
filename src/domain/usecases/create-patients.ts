import { Patient } from '@/domain/models'

export interface CreatePatients {
  create(model: CreatePatients.Model): Promise<CreatePatients.Response>
}

export namespace CreatePatients {
  export type Model = {
    name: string
    cpf: string
  }
  export type Response = Patient
}

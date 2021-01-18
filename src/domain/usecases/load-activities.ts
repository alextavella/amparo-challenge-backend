import {
  ActivityStatus,
  ListActivity,
  PaginationModel,
  PaginationResponse,
} from '@/domain/models'

export interface LoadActivities {
  load(model?: LoadActivities.Model): Promise<LoadActivities.Response>
}

export namespace LoadActivities {
  export type Model = PaginationModel & {
    date: Date
    cpf?: string
    status?: ActivityStatus
  }
  export type Response = PaginationResponse<ListActivity[]>
}

import { Activity, ActivityStatus } from '@/domain/models'

export interface CreateActivities {
  create(model: CreateActivities.Model): Promise<CreateActivities.Response>
}

export namespace CreateActivities {
  export type Model = {
    patient_id: string
    data_vencimento: string
    status: ActivityStatus
    name: string
  }

  export type Response = Activity
}

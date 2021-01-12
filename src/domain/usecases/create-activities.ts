import { Activity, ActivityStatus } from '@/domain/models'

export interface CreateActivities {
  create(model: CreateActivities.Model): Promise<CreateActivities.Response>
}

export namespace CreateActivities {
  export type Model = {
    patient_id: string
    expire_date: Date
    status: ActivityStatus
    name: string
  }
  export type Response = Activity
}

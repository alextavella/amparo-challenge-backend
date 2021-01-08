import { Activity, ActivityStatus } from '@/domain/models'

export interface ChangeActivityStatus {
  change(
    model: ChangeActivityStatus.Model,
  ): Promise<ChangeActivityStatus.Response>
}

export namespace ChangeActivityStatus {
  export type Model = {
    id: string
    status: ActivityStatus
  }
  export type Response = Omit<Activity, 'patient_id'>
}

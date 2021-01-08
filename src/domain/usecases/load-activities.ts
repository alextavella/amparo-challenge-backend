import { ListActivity } from '@/domain/models'

export interface LoadActivities {
  load(model?: LoadActivities.Model): Promise<LoadActivities.Response>
}

export namespace LoadActivities {
  export type Model = {
    data: string
  }

  export type Response = ListActivity[]
}

import { ActivityStatus, ListActivity } from '@/domain/models'

export class LoadActivitiesViewModel {
  id!: string
  patient_name!: string
  expire_date!: Date
  status!: ActivityStatus
  name!: string

  static map(entity: ListActivity): LoadActivitiesViewModel {
    return {
      ...entity,
    }
  }

  static mapCollection(entities: ListActivity[]): LoadActivitiesViewModel[] {
    return entities.map(LoadActivitiesViewModel.map)
  }
}

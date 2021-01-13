import { makeLoadActivitiesValidation } from './load-activities-validation-factory'
import { makeLoadActivitiesService } from '@/main/factories/services'
import { LoadActivitiesController } from '@/presentation/controllers'

export const makeLoadActivitiesController = () =>
  new LoadActivitiesController(
    makeLoadActivitiesValidation(),
    makeLoadActivitiesService(),
  )

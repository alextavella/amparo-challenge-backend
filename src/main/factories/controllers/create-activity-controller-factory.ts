import { makeCreateActivityService } from '@/main/factories/services'
import { CreateActivityController } from '@/presentation/controllers'
import { makeCreateActivityValidation } from './create-activity-validation-factory'

export const makeCreateActivityController = () =>
  new CreateActivityController(
    makeCreateActivityValidation(),
    makeCreateActivityService(),
  )

import { makeChangeActivityStatusService } from '@/main/factories/services'
import { ChangeActivityStatusController } from '@/presentation/controllers'
import { makeChangeActivityStatusValidation } from './change-activity-status-validation-factory'

export const makeChangeActivityStatusController = () =>
  new ChangeActivityStatusController(
    makeChangeActivityStatusValidation(),
    makeChangeActivityStatusService(),
  )

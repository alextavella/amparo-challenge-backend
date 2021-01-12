import { makeCreatePatientService } from '@/main/factories/services'
import { CreatePatientController } from '@/presentation/controllers'
import { makeCreatePatientValidation } from './create-patient-validation-factory'

export const makeCreatePatientController = () =>
  new CreatePatientController(
    makeCreatePatientValidation(),
    makeCreatePatientService(),
  )

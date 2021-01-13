import { makeSearchPatientsByNameOrCpfService } from '@/main/factories/services'
import { SearchPatientsByNameOrCpfController } from '@/presentation/controllers'
import { makeSearchPatientsByNameValidation } from './search-patients-by-name-validation-factory'

export const makeSearchPatientsByNameOrCpfController = () =>
  new SearchPatientsByNameOrCpfController(
    makeSearchPatientsByNameValidation(),
    makeSearchPatientsByNameOrCpfService(),
  )

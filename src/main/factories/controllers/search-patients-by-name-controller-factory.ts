import { makeSearchPatientsByNameService } from '@/main/factories/services'
import { SearchPatientsByNameController } from '@/presentation/controllers'
import { makeSearchPatientsByNameValidation } from './search-patients-by-name-validation-factory'

export const makeSearchPatientsByNameController = () =>
  new SearchPatientsByNameController(
    makeSearchPatientsByNameValidation(),
    makeSearchPatientsByNameService(),
  )

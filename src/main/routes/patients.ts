import { adaptRoute } from '@/main/adapters'
import {
  makeCreatePatientController,
  makeSearchPatientsByNameController,
} from '@/main/factories/controllers'
import { Router } from 'express'

export default (router: Router) => {
  router.post('/', adaptRoute(makeCreatePatientController()))
  router.get(
    '/search',
    adaptRoute(makeSearchPatientsByNameController(), { query: ['name'] }),
  )
}

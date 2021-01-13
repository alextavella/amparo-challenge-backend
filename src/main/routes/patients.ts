import { adaptRoute } from '@/main/adapters'
import {
  makeCreatePatientController,
  makeSearchPatientsByNameOrCpfController,
} from '@/main/factories/controllers'
import { Router } from 'express'

export default (router: Router) => {
  router.post('/', adaptRoute(makeCreatePatientController()))
  router.get(
    '/search',
    adaptRoute(makeSearchPatientsByNameOrCpfController(), { query: ['term'] }),
  )
}

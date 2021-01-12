import { adaptRoute } from '@/main/adapters'
import { makeCreatePatientController } from '@/main/factories/controllers'
import { Router } from 'express'

export default (router: Router) => {
  router.post('/', adaptRoute(makeCreatePatientController()))
}

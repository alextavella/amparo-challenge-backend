import { adaptRoute } from '@/main/adapters'
import { makeCreateActivityController } from '@/main/factories/controllers'
import { Router } from 'express'

export default (router: Router) => {
  router.post('/', adaptRoute(makeCreateActivityController()))
}

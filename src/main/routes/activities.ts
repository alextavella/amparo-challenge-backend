import { adaptRoute, adaptRouteWithPagination } from '@/main/adapters'
import {
  makeCreateActivityController,
  makeLoadActivitiesController,
} from '@/main/factories/controllers'
import { Router } from 'express'

export default (router: Router) => {
  router.post('/', adaptRoute(makeCreateActivityController()))
  router.get(
    '/:date?',
    adaptRouteWithPagination(makeLoadActivitiesController()),
  )
}

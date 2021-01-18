import { adaptRoute, adaptRouteWithPagination } from '@/main/adapters'
import {
  makeChangeActivityStatusController,
  makeCreateActivityController,
  makeLoadActivitiesController,
} from '@/main/factories/controllers'
import { Router } from 'express'

export default (router: Router) => {
  router.post('/', adaptRoute(makeCreateActivityController()))
  router.get(
    '/:date?',
    adaptRouteWithPagination(makeLoadActivitiesController(), {
      query: ['status', 'cpf'],
    }),
  )
  router.patch('/:id', adaptRoute(makeChangeActivityStatusController()))
}

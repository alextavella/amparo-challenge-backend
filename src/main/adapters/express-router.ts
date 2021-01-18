import { Controller } from '@/presentation/contracts/controller'
import { Request, Response } from 'express'

type RouteOptions = {
  query: string[]
}

export const adaptRoute = (controller: Controller, options?: RouteOptions) => {
  return async (req: Request, res: Response) => {
    const params = {}

    options?.query.forEach((key) => {
      if (key in req.query) {
        Object.assign(params, { [key]: req.query[key] })
      }
    })

    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
      ...params,
    }

    const response = await controller.handle(request)
    return res.status(response.statusCode).json(response.data)
  }
}

type PaginationOptions = {
  page: number
  size: number
}

export const adaptRouteWithPagination = (
  controller: Controller,
  options?: RouteOptions,
  paginationOptions: PaginationOptions = { page: 1, size: 10 },
) => {
  return async (req: Request, res: Response) => {
    if (!req.query?.page) {
      Object.assign(req.query, { page: paginationOptions.page })
    }

    if (!req.query?.size) {
      Object.assign(req.query, { size: paginationOptions.size })
    }

    const query = options?.query ?? []

    const opts: RouteOptions = {
      ...options,
      query: [...query, 'page', 'size'],
    }

    return adaptRoute(controller, opts)(req, res)
  }
}

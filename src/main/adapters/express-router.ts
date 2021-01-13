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
  options?: PaginationOptions,
) => {
  return async (req: Request, res: Response) => {
    const page = req.query?.page ?? options?.page ?? 1
    const size = req.query?.size ?? options?.page ?? 10

    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
      page: +page,
      size: +size,
    }

    const response = await controller.handle(request)
    return res.status(response.statusCode).json(response.data)
  }
}

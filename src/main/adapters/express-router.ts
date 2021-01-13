import { Controller } from '@/presentation/contracts/controller'
import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
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

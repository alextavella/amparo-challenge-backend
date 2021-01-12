import { HttpResponse } from '@/presentation/contracts'
import {
  AppError,
  ServerError,
  ValidationErrorsResult,
} from '@/presentation/errors'

type AnyError = Error | Error[] | ValidationErrorsResult | AppError

export const badRequest = (error: AnyError): HttpResponse => ({
  statusCode: 400,
  data: error,
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  data: error,
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  data: new ServerError(error.stack ?? 'Server Error!'),
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  data: data,
})

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  data: data,
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  data: null,
})

export const anyError = (error: AnyError): HttpResponse => {
  if (error instanceof AppError) {
    return {
      statusCode: error.statusCode,
      data: error,
    }
  }
  return serverError(error as Error)
}

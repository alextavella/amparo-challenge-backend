import { ValidationErrorsResult, ServerError } from '@/presentation/errors'
import { HttpResponse } from '@/presentation/contracts'

type AnyError = Error | Error[] | ValidationErrorsResult

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

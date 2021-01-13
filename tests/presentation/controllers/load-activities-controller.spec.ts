import { LoadActivitiesController } from '@/presentation/controllers'
import { badRequest } from '@/presentation/helpers'
import { LoadActivitiesSpy } from '@/presentation/mocks'
import { parseISODate, resetHour } from '@/presentation/utils'
import { ValidationSpy } from '../mocks'

let loadActivitiesController: LoadActivitiesController
let validation: ValidationSpy
let loadActivitiesSpy: LoadActivitiesSpy

const date = new Date(2021, 0, 1)
const mockRequest = (): LoadActivitiesController.Request => ({
  page: 1,
  size: 1,
  date: date.toISOString(),
})

describe('LoadActivitiesController', () => {
  beforeEach(() => {
    validation = new ValidationSpy()
    loadActivitiesSpy = new LoadActivitiesSpy()
    loadActivitiesController = new LoadActivitiesController(
      validation,
      loadActivitiesSpy,
    )
  })

  it('should be able call LoadActivitiesController with correct values', async () => {
    const request = mockRequest()
    await loadActivitiesController.handle(request)
    expect(loadActivitiesSpy.params).toEqual({
      page: request.page,
      size: request.size,
      date: resetHour(parseISODate(request.date)),
    })
  })

  it('should return 400 if LoadActivitiesController throws', async () => {
    jest.spyOn(validation, 'validate').mockReturnValue(new Error())
    const request = mockRequest()
    const error = await loadActivitiesController.handle(request)
    expect(error).toStrictEqual(badRequest(new Error()))
  })
})

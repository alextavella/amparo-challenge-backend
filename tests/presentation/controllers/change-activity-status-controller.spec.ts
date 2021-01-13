import { ActivityStatus } from '@/domain/models'
import { ChangeActivityStatusController } from '@/presentation/controllers'
import { badRequest } from '@/presentation/helpers'
import { ChangeActivityStatusSpy } from '@/presentation/mocks'
import { ValidationSpy } from '../mocks'

let changeActivityStatusController: ChangeActivityStatusController
let validation: ValidationSpy
let changeActivityStatusSpy: ChangeActivityStatusSpy

const mockRequest = (): ChangeActivityStatusController.Request => ({
  id: 'activity-id',
  status: ActivityStatus.finalizado,
})

describe('ChangeActivityStatusController', () => {
  beforeEach(() => {
    validation = new ValidationSpy()
    changeActivityStatusSpy = new ChangeActivityStatusSpy()
    changeActivityStatusController = new ChangeActivityStatusController(
      validation,
      changeActivityStatusSpy,
    )
  })

  it('should be able call ChangeActivityStatusController with correct values', async () => {
    const request = mockRequest()
    await changeActivityStatusController.handle(request)
    expect(changeActivityStatusSpy.params).toEqual({
      id: request.id,
      status: request.status,
    })
  })

  it('should return 400 if ChangeActivityStatusController throws', async () => {
    jest.spyOn(validation, 'validate').mockReturnValue(new Error())
    const request = mockRequest()
    const error = await changeActivityStatusController.handle(request)
    expect(error).toStrictEqual(badRequest(new Error()))
  })
})

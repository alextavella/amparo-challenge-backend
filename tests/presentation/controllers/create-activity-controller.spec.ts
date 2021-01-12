import { CreateActivityController } from '@/presentation/controllers'
import { badRequest } from '@/presentation/helpers'
import { CreateActivitySpy } from '@/presentation/mocks'
import { ValidationSpy } from '../mocks'

let createActivityController: CreateActivityController
let validation: ValidationSpy
let createActivities: CreateActivitySpy

const mockRequest = (): CreateActivityController.Request => ({
  patient_id: 'patient_id',
  expire_date: '01/01/2021',
  status: 0,
  name: 'Verificar com o paciente se o medicamento fez efeito',
})

describe('CreateActivityController', () => {
  beforeEach(() => {
    validation = new ValidationSpy()
    createActivities = new CreateActivitySpy()
    createActivityController = new CreateActivityController(
      validation,
      createActivities,
    )
  })

  it('should be able call CreateActivityController with correct values', async () => {
    const request = mockRequest()
    await createActivityController.handle(request)
    expect(createActivities.params).toEqual({
      patient_id: request.patient_id,
      expire_date: new Date(2021, 0, 1),
      status: request.status,
      name: request.name,
    })
  })

  it('should return 400 if CreateActivityController throws', async () => {
    jest.spyOn(validation, 'validate').mockReturnValue(new Error())
    const request = mockRequest()
    const error = await createActivityController.handle(request)
    expect(error).toStrictEqual(badRequest(new Error()))
  })
})

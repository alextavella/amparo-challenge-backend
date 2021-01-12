import { CreatePatientController } from '@/presentation/controllers'
import { badRequest } from '@/presentation/helpers'
import { CreatePatientsSpy } from '@/presentation/mocks'
import { ValidationSpy } from '../mocks'

let createPatientController: CreatePatientController
let validation: ValidationSpy
let createPatientsSpy: CreatePatientsSpy

const mockRequest = (): CreatePatientController.Request => ({
  name: 'Nome paciente',
  cpf: '746.922.060-71',
})

describe('CreatePatientController', () => {
  beforeEach(() => {
    validation = new ValidationSpy()
    createPatientsSpy = new CreatePatientsSpy()
    createPatientController = new CreatePatientController(
      validation,
      createPatientsSpy,
    )
  })

  it('should be able call CreatePatientController with correct values', async () => {
    const request = mockRequest()
    await createPatientController.handle(request)
    expect(createPatientsSpy.params).toEqual({
      name: request.name,
      cpf: request.cpf,
    })
  })

  it('should return 400 if CreatePatientController throws', async () => {
    jest.spyOn(validation, 'validate').mockReturnValue(new Error())
    const request = mockRequest()
    const error = await createPatientController.handle(request)
    expect(error).toStrictEqual(badRequest(new Error()))
  })
})

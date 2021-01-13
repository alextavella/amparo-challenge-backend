import { SearchPatientsByNameOrCpfController } from '@/presentation/controllers'
import { badRequest, noContent } from '@/presentation/helpers'
import { SearchPatientsSpy } from '@/presentation/mocks'
import faker from 'faker'
import { ValidationSpy } from '../mocks'

let searchPatientsByNameOrCpfController: SearchPatientsByNameOrCpfController
let validation: ValidationSpy
let searchPatientsSpy: SearchPatientsSpy

const mockRequest = (): SearchPatientsByNameOrCpfController.Request => ({
  term: 'name',
})

describe('SearchPatientsByNameOrCpfController', () => {
  beforeEach(() => {
    validation = new ValidationSpy()
    searchPatientsSpy = new SearchPatientsSpy()
    searchPatientsByNameOrCpfController = new SearchPatientsByNameOrCpfController(
      validation,
      searchPatientsSpy,
    )
  })

  it('should be able call SearchPatientsByNameOrCpfController with correct values', async () => {
    const request = mockRequest()
    await searchPatientsByNameOrCpfController.handle(request)
    expect(searchPatientsSpy.params).toEqual(request.term)
  })

  it('should be able call LoadActivitiesController and return a list when to found patients', async () => {
    const request = mockRequest()
    searchPatientsSpy.response = [
      {
        id: faker.random.uuid(),
        name: request.term,
        cpf: faker.random.number().toString(),
      },
    ]
    await searchPatientsByNameOrCpfController.handle(request)
    expect(searchPatientsSpy.params).toEqual(request.term)
  })

  it('should return 400 if SearchPatientsByNameOrCpfController throws', async () => {
    jest.spyOn(validation, 'validate').mockReturnValue(new Error())
    const request = mockRequest()
    const error = await searchPatientsByNameOrCpfController.handle(request)
    expect(error).toStrictEqual(badRequest(new Error()))
  })

  it('should return 204 if SearchPatientsByNameOrCpfController is empty', async () => {
    const request = mockRequest()
    const error = await searchPatientsByNameOrCpfController.handle(request)
    expect(error).toStrictEqual(noContent())
  })
})

import { SearchPatientsByNameController } from '@/presentation/controllers'
import { badRequest } from '@/presentation/helpers'
import { SearchPatientsSpy } from '@/presentation/mocks'
import { ValidationSpy } from '../mocks'

let searchPatientsByNameController: SearchPatientsByNameController
let validation: ValidationSpy
let searchPatientsSpy: SearchPatientsSpy

const mockRequest = (): SearchPatientsByNameController.Request => ({
  name: 'name',
})

describe('SearchPatientsByNameController', () => {
  beforeEach(() => {
    validation = new ValidationSpy()
    searchPatientsSpy = new SearchPatientsSpy()
    searchPatientsByNameController = new SearchPatientsByNameController(
      validation,
      searchPatientsSpy,
    )
  })

  it('should be able call SearchPatientsByNameController with correct values', async () => {
    const request = mockRequest()
    await searchPatientsByNameController.handle(request)
    expect(searchPatientsSpy.params).toEqual(request.name)
  })

  it('should return 400 if SearchPatientsByNameController throws', async () => {
    jest.spyOn(validation, 'validate').mockReturnValue(new Error())
    const request = mockRequest()
    const error = await searchPatientsByNameController.handle(request)
    expect(error).toStrictEqual(badRequest(new Error()))
  })
})

import { InvalidParamError } from '@/presentation/errors'
import { MockUuidValidator } from '@/tests/validation/mocks'
import { UuidValidator } from '@/validation/protocols'
import { UuidValidation } from '@/validation/validators'
import faker from 'faker'

const field = faker.random.word()

let uuidValidation: UuidValidation
let mockUuidValidator: UuidValidator

describe('UuidValidation', () => {
  beforeEach(() => {
    mockUuidValidator = new MockUuidValidator()
    uuidValidation = new UuidValidation(field, mockUuidValidator)
  })

  it('should be able validate a valid id', () => {
    const id = 'f5c0ca40-54f7-11eb-bdab-c370a58e4081'
    const result = uuidValidation.validate({ [field]: id })
    expect(result).toBeUndefined()
  })

  it('should return throw when invalid id', () => {
    jest.spyOn(mockUuidValidator, 'isValid').mockReturnValue(false)
    expect(uuidValidation.validate).toThrow()
  })

  it('should return InvalidParamError when invalid id', () => {
    jest.spyOn(mockUuidValidator, 'isValid').mockReturnValue(false)
    const id = 'f5c0ca40-54f7-11eb-bdab'
    const error = uuidValidation.validate({ [field]: id })
    expect(error).toEqual(new InvalidParamError(field))
  })
})

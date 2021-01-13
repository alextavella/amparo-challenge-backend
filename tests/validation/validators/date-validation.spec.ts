import { InvalidParamError } from '@/presentation/errors'
import { MockDateValidator } from '@/tests/validation/mocks'
import { DateValidator } from '@/validation/protocols'
import { DateValidation } from '@/validation/validators'
import faker from 'faker'

const field = faker.random.word()

let dateValidation: DateValidation
let mockDateValidator: DateValidator

describe('DateValidation', () => {
  beforeEach(() => {
    mockDateValidator = new MockDateValidator()
    dateValidation = new DateValidation(field, mockDateValidator)
  })

  it('should be able validate a date', () => {
    const date = new Date(2021, 0, 20).toISOString()
    const result = dateValidation.validate({ [field]: date })
    expect(result).toBeUndefined()
  })

  it('should return throw when invalid date', () => {
    jest.spyOn(mockDateValidator, 'isValid').mockReturnValue(false)
    expect(dateValidation.validate).toThrow()
  })

  it('should return InvalidParamError when invalid format date', () => {
    jest.spyOn(mockDateValidator, 'isValid').mockReturnValue(false)
    const date = '2021/01/01'
    const error = dateValidation.validate({ [field]: date })
    expect(error).toEqual(new InvalidParamError(field))
  })

  it('should return InvalidParamError when invalid date', () => {
    jest.spyOn(mockDateValidator, 'isValid').mockReturnValue(false)
    const date = 'text'
    const error = dateValidation.validate({ [field]: date })
    expect(error).toEqual(new InvalidParamError(field))
  })

  it('should be able validate when optional', () => {
    const date = undefined
    const result = dateValidation.optional().validate({ [field]: date })
    expect(result).toBeUndefined()
  })
})

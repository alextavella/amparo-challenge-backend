import { InvalidParamError } from '@/presentation/errors'
import { MockNumericValidator } from '@/tests/validation/mocks'
import { NumericValidator } from '@/validation/protocols'
import { NumericValidation } from '@/validation/validators'
import faker from 'faker'

const field = faker.random.word()

let numericValidation: NumericValidation
let mockNumericValidator: NumericValidator

describe('NumericValidation', () => {
  beforeEach(() => {
    mockNumericValidator = new MockNumericValidator()
    numericValidation = new NumericValidation(field, mockNumericValidator)
  })

  it('should be able validate a integer', () => {
    const number = 123
    const result = numericValidation.validate({ [field]: number })
    expect(result).toBeUndefined()
  })

  it('should be able validate a decimal', () => {
    const number = 123.5
    const result = numericValidation.validate({ [field]: number })
    expect(result).toBeUndefined()
  })

  it('should return throw when invalid number', () => {
    jest.spyOn(mockNumericValidator, 'isValid').mockReturnValue(false)
    expect(numericValidation.validate).toThrow()
  })

  it('should return InvalidParamError when invalid number', () => {
    jest.spyOn(mockNumericValidator, 'isValid').mockReturnValue(false)
    const number = 'text'
    const error = numericValidation.validate({ [field]: number })
    expect(error).toEqual(new InvalidParamError(field))
  })

  it('should be able validate when optional', () => {
    const number = undefined
    const result = numericValidation.optional().validate({ [field]: number })
    expect(result).toBeUndefined()
  })
})

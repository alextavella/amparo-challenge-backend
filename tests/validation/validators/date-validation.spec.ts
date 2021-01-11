import { InvalidParamError } from '@/presentation/errors'
import { MockCpfValidator } from '@/tests/validation/mocks'
import { DateValidator } from '@/validation/protocols'
import { DateValidation } from '@/validation/validators'
import faker from 'faker'

const field = faker.random.word()

let dateValidation: DateValidation
let mockDateValidator: DateValidator

describe('DateValidation', () => {
  beforeEach(() => {
    mockDateValidator = new MockCpfValidator()
    dateValidation = new DateValidation(field, mockDateValidator)
  })

  it('should be able validate a valid date', () => {
    const date = '01/01/2021'
    const result = dateValidation.validate({ [field]: date })
    expect(result).toBeUndefined()
  })

  it('should return throw when invalid cpf', () => {
    jest.spyOn(mockDateValidator, 'isValid').mockReturnValue(false)
    expect(dateValidation.validate).toThrow()
  })

  it('should return InvalidParamError when invalid cpf', () => {
    jest.spyOn(mockDateValidator, 'isValid').mockReturnValue(false)
    const date = '2021/01/01'
    const error = dateValidation.validate({ [field]: date })
    expect(error).toEqual(new InvalidParamError(field))
  })
})

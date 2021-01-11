import { MissingParamError } from '@/presentation/errors'
import { RequiredFieldValidation } from '@/validation/validators'
import faker from 'faker'

const field = faker.random.word()

let requiredFieldValidation: RequiredFieldValidation

describe('RequiredFieldValidation', () => {
  beforeEach(() => {
    requiredFieldValidation = new RequiredFieldValidation(field)
  })

  it('should be valid when value is filled', () => {
    const value = 'value'
    const result = requiredFieldValidation.validate({ [field]: value })
    expect(result).toBeUndefined()
  })

  it('should return MissingParamError when invalid value', () => {
    const value = ''
    const error = requiredFieldValidation.validate({ [field]: value })
    expect(error).toEqual(new MissingParamError(field))
  })
})

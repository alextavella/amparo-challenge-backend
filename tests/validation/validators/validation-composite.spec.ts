import { ValidationError } from '@/presentation/errors'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { ValidationComposite } from '@/validation/validators'
import faker from 'faker'

const field = faker.random.word()

describe('ValidationComposite', () => {
  it('should return a list of errors', () => {
    const validations = [
      new ValidationSpy(),
      new ValidationSpy(),
      new ValidationSpy(),
    ]

    validations[0].error = new Error()
    validations[1].error = new Error()
    validations[2].error = new Error()

    const validationComposite = new ValidationComposite(validations)
    const value = 'value'
    const result = validationComposite.validate({ [field]: value }) as Error[]

    expect(result.length).toBe(3)
  })

  it('should return only one ValidationErrorsResult for field', () => {
    const validations = [
      new ValidationSpy(),
      new ValidationSpy(),
      new ValidationSpy(),
    ]

    validations[0].error = new ValidationError(field, 'Message 1')
    validations[1].error = new ValidationError(field, 'Message 2')
    validations[2].error = new ValidationError(field, 'Message 3')

    const validationComposite = new ValidationComposite(validations)
    const value = 'value'
    const result = validationComposite.validate({ [field]: value }) as Error[]

    const validErrors = {
      [field]: 'Message 1',
    }

    expect(result).toStrictEqual({
      message: 'Erro de validação',
      errors: validErrors,
    })
  })

  it('should return ValidationErrorsResult for fields', () => {
    const validations = [
      new ValidationSpy(),
      new ValidationSpy(),
      new ValidationSpy(),
    ]

    const field1 = faker.random.word()
    const field2 = faker.random.word()
    const field3 = faker.random.word()

    validations[0].error = new ValidationError(field1, 'Message 1')
    validations[1].error = new ValidationError(field2, 'Message 2')
    validations[2].error = new ValidationError(field3, 'Message 3')

    const validationComposite = new ValidationComposite(validations)
    const value = 'value'
    const result = validationComposite.validate({ [field]: value }) as Error[]

    const validErrors = {
      [field1]: 'Message 1',
      [field2]: 'Message 2',
      [field3]: 'Message 3',
    }

    expect(result).toStrictEqual({
      message: 'Erro de validação',
      errors: validErrors,
    })
  })
})

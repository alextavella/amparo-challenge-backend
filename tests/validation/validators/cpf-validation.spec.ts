import { InvalidParamError } from '@/presentation/errors'
import { MockCpfValidator } from '@/tests/validation/mocks'
import { CpfValidator } from '@/validation/protocols'
import { CpfValidation } from '@/validation/validators'
import faker from 'faker'

const field = faker.random.word()

let cpfValidation: CpfValidation
let mockCpfValidator: CpfValidator

describe('CpfValidation', () => {
  beforeEach(() => {
    mockCpfValidator = new MockCpfValidator()
    cpfValidation = new CpfValidation(field, mockCpfValidator)
  })

  it('should be able validate a valid cpf', () => {
    const cpf = '746.922.060-71'
    const result = cpfValidation.validate({ [field]: cpf })
    expect(result).toBeUndefined()
  })

  it('should return throw when invalid cpf', () => {
    jest.spyOn(mockCpfValidator, 'isValid').mockReturnValue(false)
    expect(cpfValidation.validate).toThrow()
  })

  it('should return a InvalidParamError when invalid cpf', () => {
    jest.spyOn(mockCpfValidator, 'isValid').mockReturnValue(false)
    const cpf = '111.111.111-11'
    const error = cpfValidation.validate({ [field]: cpf })
    expect(error).toEqual(new InvalidParamError(field))
  })
})

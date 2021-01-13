import { NumericValidatorAdapter } from '@/infra/validators'

let numericValidatorAdapter: NumericValidatorAdapter

describe('NumericValidatorAdapter', () => {
  beforeEach(() => {
    numericValidatorAdapter = new NumericValidatorAdapter()
  })

  it('should be able validate a number', () => {
    const number = 123
    const result = numericValidatorAdapter.isValid(number)
    expect(result).toBeTruthy()
  })

  it('should be able validate a string number', () => {
    const number = '123'
    const result = numericValidatorAdapter.isValid(number)
    expect(result).toBeTruthy()
  })

  it('should not be able validate a word', () => {
    const date = '123F'
    const result = numericValidatorAdapter.isValid(date)
    expect(result).toBeFalsy()
  })
})

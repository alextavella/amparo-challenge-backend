import { DateValidatorAdapter } from '@/infra/validators'

let dateValidatorAdapter: DateValidatorAdapter

describe('DateValidatorAdapter', () => {
  beforeEach(() => {
    dateValidatorAdapter = new DateValidatorAdapter()
  })

  it('should be able validate a valid date to iso format', () => {
    const date = new Date(2021, 0, 20).toISOString()
    const result = dateValidatorAdapter.isValid(date)
    expect(result).toBeTruthy()
  })

  it('should be able validate a valid date in iso format', () => {
    const date = '2021-01-13T17:16:15.371Z'
    const result = dateValidatorAdapter.isValid(date)
    expect(result).toBeTruthy()
  })

  it('should not be able validate an invalid date', () => {
    const date = '2021/01/01'
    const result = dateValidatorAdapter.isValid(date)
    expect(result).toBeFalsy()
  })
})

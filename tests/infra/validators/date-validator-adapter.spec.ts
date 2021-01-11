import { DateValidatorAdapter } from '@/infra/validators'

let dateValidatorAdapter: DateValidatorAdapter

describe('DateValidatorAdapter', () => {
  beforeEach(() => {
    dateValidatorAdapter = new DateValidatorAdapter()
  })

  it('should be able validate a valid date', () => {
    const date = '01/01/2021'
    const result = dateValidatorAdapter.isValid(date)
    expect(result).toBeTruthy()
  })

  it('should not be able validate an invalid date', () => {
    const date = '2021/01/01'
    const result = dateValidatorAdapter.isValid(date)
    expect(result).toBeFalsy()
  })
})

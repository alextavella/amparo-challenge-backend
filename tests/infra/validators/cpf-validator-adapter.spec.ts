import { CpfValidatorAdapter } from '@/infra/validators'

let cpfValidatorAdapter: CpfValidatorAdapter

describe('CpfValidatorAdapter', () => {
  beforeEach(() => {
    cpfValidatorAdapter = new CpfValidatorAdapter()
  })

  it('should be able validate a valid cpf', () => {
    const cpf = '746.922.060-71'
    const result = cpfValidatorAdapter.isValid(cpf)
    expect(result).toBeTruthy()
  })

  it('should not be able validate an invalid cpf', () => {
    const cpf = '111.111.111-11'
    const result = cpfValidatorAdapter.isValid(cpf)
    expect(result).toBeFalsy()
  })
})

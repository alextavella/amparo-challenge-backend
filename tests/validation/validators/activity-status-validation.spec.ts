import { ActivityStatus } from '@/domain/models'
import { InvalidParamError } from '@/presentation/errors'
import { AcitivityStatusValidation } from '@/validation/validators'
import faker from 'faker'

const field = faker.random.word()

let acitivityStatusValidation: AcitivityStatusValidation

describe('AcitivityStatusValidation', () => {
  beforeEach(() => {
    acitivityStatusValidation = new AcitivityStatusValidation(field)
  })

  it('should be able validate when status is aberto', () => {
    const status = ActivityStatus.aberto
    const result = acitivityStatusValidation.validate({ [field]: status })
    expect(result).toBeUndefined()
  })

  it('should be able validate when status is atrasado', () => {
    const status = ActivityStatus.atrasado
    const result = acitivityStatusValidation.validate({ [field]: status })
    expect(result).toBeUndefined()
  })

  it('should be able validate when status is finalizado', () => {
    const status = ActivityStatus.finalizado
    const result = acitivityStatusValidation.validate({ [field]: status })
    expect(result).toBeUndefined()
  })

  it('should return InvalidParamError when invalid format date', () => {
    const status = 4
    const error = acitivityStatusValidation.validate({ [field]: status })
    expect(error).toEqual(new InvalidParamError(field))
  })
})

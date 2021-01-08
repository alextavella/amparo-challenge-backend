import { ActivityStatus } from '@/domain/models'

export type ActivityEntity = {
  id: string
  patient_id: string
  data_vencimento: Date
  status: ActivityEntityStatus
  name: string
}

export enum ActivityEntityStatus {
  aberto = 0,
  atrasado = 1,
  finalizado = 2,
}

export const convertToActivityEntityStatus = (status: ActivityStatus) => {
  const enums = {
    [ActivityStatus.aberto]: ActivityEntityStatus.aberto,
    [ActivityStatus.atrasado]: ActivityEntityStatus.atrasado,
    [ActivityStatus.finalizado]: ActivityEntityStatus.finalizado,
  }
  return enums[status]
}

export const convertToActivityStatus = (status: ActivityEntityStatus) => {
  const enums = {
    [ActivityEntityStatus.aberto]: ActivityStatus.aberto,
    [ActivityEntityStatus.atrasado]: ActivityStatus.atrasado,
    [ActivityEntityStatus.finalizado]: ActivityStatus.finalizado,
  }
  return enums[status]
}

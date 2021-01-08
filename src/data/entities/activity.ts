import { PatientEntity } from '@/data/entities'

export type ActivityEntity = {
  id: string
  patient: PatientEntity
  data_vencimento: Date
  status: ActivityStatus
  name: string
}

export enum ActivityStatus {
  aberto,
  atrasado,
  finalizado,
}

export type Activity = {
  id: string
  patient_id: string
  data_vencimento: string
  status: ActivityStatus
  name: string
}

export enum ActivityStatus {
  aberto,
  atrasado,
  finalizado,
}

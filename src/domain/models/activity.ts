export type Activity = {
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

export type Activity = {
  id: string
  patient_id: string
  data_vencimento: string
  status: ActivityStatus
  name: string
}

export type ListActivity = {
  id: string
  patient_name: string
  data_vencimento: string
  status: string
  name: string
}

export enum ActivityStatus {
  aberto,
  atrasado,
  finalizado,
}

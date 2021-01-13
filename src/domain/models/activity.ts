export type Activity = {
  id: string
  patient_id: string
  expire_date: Date
  status: ActivityStatus
  name: string
}

export interface ListActivity {
  id: string
  patient_name: string
  expire_date: Date
  status: ActivityStatus
  name: string
}

export enum ActivityStatus {
  aberto = 0,
  atrasado = 1,
  finalizado = 2,
}

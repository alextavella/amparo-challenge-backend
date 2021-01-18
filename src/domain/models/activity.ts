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
  patient_cpf: string
  expire_date: Date
  status: ActivityStatus
  name: string
}

export enum ActivityStatus {
  aberto = 1,
  atrasado = 2,
  finalizado = 3,
}

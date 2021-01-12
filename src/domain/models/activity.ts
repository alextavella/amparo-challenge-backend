export type Activity = {
  id: string
  patient_id: string
  expire_date: Date
  status: ActivityStatus
  name: string
}

export type ListActivity = {
  id: string
  nome_paciente: string
  expire_date: Date
  status: ActivityStatus
  name: string
}

export enum ActivityStatus {
  aberto = 0,
  atrasado = 1,
  finalizado = 2,
}

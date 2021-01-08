import { LoadActivitiesRepository, LoadPatientByIdRepository } from '@/data/db'
import {
  ActivityEntity,
  convertToActivityStatus,
  PatientEntity,
} from '@/data/entities'
import { LoadActivities } from '@/domain/usecases'

export class LoadActivitiesService implements LoadActivities {
  constructor(
    private readonly repository: LoadActivitiesRepository,
    private readonly patientRepository: LoadPatientByIdRepository,
  ) {}

  async load(
    model: LoadActivitiesService.Model,
  ): Promise<LoadActivitiesService.Response> {
    const date = new Date(model.data)

    const entities = await this.repository.loadByDate(date)

    const patient_ids = entities
      .map((a) => a.patient_id)
      .reduce<string[]>((acc, item) => {
        if (!acc.includes(item)) acc.push(item)
        return acc
      }, [])

    const patients = await Promise.all(
      patient_ids.map((id: string) => this.patientRepository.load(id)),
    )

    return entities.map((a) => {
      const patient = patients.find((p) => p?.id === a.patient_id)

      return {
        id: a.id,
        patient_name: patient?.name ?? '-',
        data_vencimento: a.data_vencimento.toISOString(),
        name: a.name,
        status: convertToActivityStatus(a.status).toString(),
      }
    })
  }
}

export namespace LoadActivitiesService {
  export type Model = LoadActivities.Model
  export type Response = LoadActivities.Response
}

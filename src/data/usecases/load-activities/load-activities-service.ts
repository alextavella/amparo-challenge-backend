import { LoadActivitiesRepository, LoadPatientByIdRepository } from '@/data/db'
import { LoadActivities } from '@/domain/usecases'

export class LoadActivitiesService implements LoadActivities {
  constructor(
    private readonly repository: LoadActivitiesRepository,
    private readonly patientRepository: LoadPatientByIdRepository,
  ) {}

  async load(
    model: LoadActivitiesService.Model,
  ): Promise<LoadActivitiesService.Response> {
    const entities = await this.repository.loadByDate(model.data)

    const patient_ids = entities
      .map((a) => a.patient_id)
      .reduce<string[]>((acc, item) => {
        if (!acc.includes(item)) acc.push(item)
        return acc
      }, [])

    const patients = await Promise.all(
      patient_ids.map((id: string) => this.patientRepository.load(id)),
    )

    return entities.map((activity) => {
      const patient = patients.find((p) => p?.id === activity.patient_id)

      return {
        ...activity,
        nome_paciente: patient?.name ?? '-',
      }
    })
  }
}

export namespace LoadActivitiesService {
  export type Model = LoadActivities.Model
  export type Response = LoadActivities.Response
}

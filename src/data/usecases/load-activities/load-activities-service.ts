import { LoadActivitiesRepository, LoadPatientByIdRepository } from '@/data/db'
import { ListActivity } from '@/domain/models'
import { LoadActivities } from '@/domain/usecases'

export class LoadActivitiesService implements LoadActivities {
  constructor(
    private readonly repository: LoadActivitiesRepository,
    private readonly patientRepository: LoadPatientByIdRepository,
  ) {}

  async load(
    model: LoadActivitiesService.Model,
  ): Promise<LoadActivitiesService.Response> {
    const {
      page,
      size,
      total,
      data: entities,
    } = await this.repository.loadByDate(
      model.page ?? 1,
      model.size ?? 5,
      model.date,
    )

    const patient_ids = entities
      .map((a) => a.patient_id)
      .reduce<string[]>((acc, item) => {
        if (!acc.includes(item)) acc.push(item)
        return acc
      }, [])

    const patients = await Promise.all(
      patient_ids.map((id: string) => this.patientRepository.load(id)),
    )

    const listActivities = entities.map((activity) => {
      const patient = patients.find((p) => p?.id === activity.patient_id)

      const data: ListActivity = {
        ...activity,
        patient_name: patient?.name ?? '-',
      }

      return data
    })

    return {
      page,
      size,
      total,
      data: listActivities,
    }
  }
}

export namespace LoadActivitiesService {
  export type Model = LoadActivities.Model
  export type Response = LoadActivities.Response
}

import { LoadActivitiesRepository, LoadPatientRepository } from '@/data/db'
import { ListActivity } from '@/domain/models'
import { LoadActivities } from '@/domain/usecases'

export class LoadActivitiesService implements LoadActivities {
  constructor(
    private readonly repository: LoadActivitiesRepository,
    private readonly patientRepository: LoadPatientRepository,
  ) {}

  async load(
    model: LoadActivitiesService.Model,
  ): Promise<LoadActivitiesService.Response> {
    const { page, size, total, data: activities } = await this.repository.load(
      model.page ?? 1,
      model.size ?? 5,
      {
        date: model.date,
        status: model.status,
      },
    )

    const patient_ids = activities
      .map((a) => a.patient_id)
      .reduce<string[]>((acc, item) => {
        if (!acc.includes(item)) acc.push(item)
        return acc
      }, [])

    const patients = await Promise.all(
      patient_ids.map((id: string) =>
        this.patientRepository.load({ id, cpf: model.cpf }),
      ),
    )

    const found_patient_ids = patients.filter((p) => !!p).map((p) => p?.id)

    const listActivities = activities
      .filter((activity) => {
        return found_patient_ids.includes(activity.patient_id)
      })
      .map((activity) => {
        const patient = patients.find((p) => p?.id === activity.patient_id)

        const data: ListActivity = {
          ...activity,
          patient_name: patient?.name ?? '-',
          patient_cpf: patient?.cpf ?? '-',
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

export class PatientNotFound extends Error {
  constructor() {
    super('Paciente não encontrado')
    this.name = 'PatientNotFound'
  }
}

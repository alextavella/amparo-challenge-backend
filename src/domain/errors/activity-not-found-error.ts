export class ActivityNotFound extends Error {
  constructor() {
    super('Atividade não encontrada')
    this.name = 'ActivityNotFound'
  }
}

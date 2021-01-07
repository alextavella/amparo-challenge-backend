import { v1 as uuid } from 'uuid'

export interface Collection<T = Object> {
  add(obj: T): T
}

export class FakeMemoryDb {
  private db = {}

  public collection<T = Object>(n: string): Collection {
    const col = new FakeMemoryCollection<T>(n)
    const ref = { [n]: col }
    this.db = Object.assign(this.db, ref)
    return col
  }
}

class FakeMemoryCollection<T = Object> implements Collection {
  private readonly data: T[] = []

  constructor(private readonly name: string) {}

  public add(obj: T): T {
    const added = Object.assign(obj, { id: `test-${uuid()}` })
    this.data.push(added)
    return added
  }
}

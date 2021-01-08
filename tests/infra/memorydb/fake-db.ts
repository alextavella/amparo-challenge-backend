import { Collection, MemoryCollection, MemoryDb } from '@/infra/memorydb/db'
import { v1 as uuid } from 'uuid'

export class FakeMemoryDb extends MemoryDb {
  public collection<T = Object>(n: string): Collection {
    const col = new FakeMemoryCollection<T>(n)
    const ref = { [n]: col }
    this.db = Object.assign(this.db, ref)
    return col
  }
}

class FakeMemoryCollection<T = Object> extends MemoryCollection<T> {
  public add(obj: T): T {
    const added = Object.assign(obj, { id: `test-${uuid()}` })
    super.data.push(added)
    return added
  }
}

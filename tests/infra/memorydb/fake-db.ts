import { Collection, MemoryCollection, MemoryDb } from '@/infra/memorydb/db'

export class FakeMemoryDb extends MemoryDb {
  public collection<T = Object>(n: string): Collection {
    const col = new MemoryCollection<T>(n)
    const ref = { [n]: col }
    FakeMemoryDb.db = Object.assign(FakeMemoryDb.db, ref)
    return col
  }
}

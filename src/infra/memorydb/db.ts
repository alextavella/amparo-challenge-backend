import { v1 as uuid } from 'uuid'

export interface Collection<T = Object> {
  add(obj: T): T
  filter(predicate: any): T[]
}

export class MemoryDb {
  private db = {}

  public collection<T = Object>(n: string): Collection {
    const col = new MemoryCollection<T>(n)
    const ref = { [n]: col }
    this.db = Object.assign(this.db, ref)
    return col
  }
}

class MemoryCollection<T = Object> implements Collection {
  private readonly data: T[] = []

  constructor(private readonly name: string) {}

  public add(obj: T): T {
    const added = Object.assign(obj, { id: uuid() })
    this.data.push(added)
    return added
  }

  public filter(predicate: any): T[] {
    return this.data.filter(predicate)
  }
}

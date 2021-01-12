import { v1 as uuid } from 'uuid'

export interface Collection<T = Object> {
  add(obj: T): T
  filter(predicate: any): T[]
  find(predicate: any): T | undefined
  findIndex(predicate: any): number
  update(index: number, obj: T): T
}

interface Db {
  [key: string]: any
}

export class MemoryDb {
  protected static db: Db = {}

  public static collection<T = Object>(n: string): Collection {
    if (n in this.db) {
      return this.db[n] as MemoryCollection<T>
    } else {
      const col = new MemoryCollection<T>(n)
      const ref = { [n]: col }
      this.db = Object.assign(this.db, ref)
      return col
    }
  }
}

export class MemoryCollection<T = Object> implements Collection {
  protected readonly data: T[] = []

  constructor(private readonly name: string) {}

  public add(obj: T): T {
    const added = Object.assign({ id: uuid() }, obj)
    this.data.push(added)
    return added
  }

  public filter(predicate: any): T[] {
    return this.data.filter(predicate)
  }

  public find(predicate: any): T | undefined {
    return this.data.find(predicate)
  }

  public findIndex(predicate: any): number {
    return this.data.findIndex(predicate)
  }

  public update(index: number, obj: T): T {
    this.data[index] = obj
    return obj
  }
}

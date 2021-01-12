import { v1 as uuid } from 'uuid'

export interface Collection<T = Object> {
  add(obj: T): T
  filter(predicate: any): T[]
  find(predicate: any): T | undefined
  findIndex(predicate: any): number
  update(index: number, obj: T): T
}

export class MemoryDb<T = Object> {
  protected db = {}

  public collection(n: string): Collection {
    const col = new MemoryCollection<T>(n)
    const ref = { [n]: col }
    this.db = Object.assign(this.db, ref)
    return col
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

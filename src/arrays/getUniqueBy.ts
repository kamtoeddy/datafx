import { NestedKeyOf, ObjectType } from '../types'
import { getDeepValue } from '../objects'

type GetUniqueByOptions = { fromBack?: boolean }

export function serialize(dt: any, revert = false) {
  try {
    return revert ? JSON.parse(dt) : JSON.stringify(dt)
  } catch (err) {
    return dt
  }
}

export function getUnique<T>(array: T[]) {
  let _array = array.map((dt) => serialize(dt))

  _array = Array.from(new Set(_array))

  return _array.map((dt) => serialize(dt, true))
}

export function getUniqueBy<T>(
  array: T[],
  key?: NestedKeyOf<T>,
  { fromBack }: GetUniqueByOptions = { fromBack: false }
) {
  let _array = Array.from(array)

  if (fromBack) _array = _array.reverse()

  if (!key) return getUnique(_array) as T[]

  let obj: ObjectType = {}

  _array.forEach((dt) => (obj[getDeepValue(dt as ObjectType, key)] = dt))

  return Object.values(obj) as T[]
}

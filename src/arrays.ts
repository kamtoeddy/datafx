import { NestedKeyOf, ObjectKey, ObjectType } from './types'
import { getDeepValue, isSubObjectEqual } from './objects'
import { isEqual } from './utils'

export {
  countBy,
  filterBy,
  findBy,
  getListOf,
  getUniqueBy,
  groupBy,
  removeAt,
  sortBy
}

type Counter<T> = (item: T) => ObjectKey

function countBy<T, OutputKeys extends ObjectKey = ObjectKey>(
  array: T[],
  determinant?: Counter<T> | NestedKeyOf<T>
) {
  if (!array || !Array.isArray(array)) return {} as ObjectType<OutputKeys>

  if (!determinant) return _countInstances(array)

  const asFx = typeof determinant === 'function'

  return array.reduce((prev, next) => {
    const key = asFx
      ? determinant(next)
      : getDeepValue(next as any, determinant as any)

    return _incrementKey(key, prev)
  }, {} as ObjectType<OutputKeys>)
}

function _incrementKey(key: string, obj: ObjectType) {
  obj[key] ? obj[key]++ : (obj[key] = 1)

  return obj
}

function _countInstances(array: any[]) {
  const obj: ObjectType = {}

  array.forEach((key) => _incrementKey(key, obj))

  return obj
}

type Filter<T> = (item: T, index: number, array: T[]) => boolean
type FilterAsObject<T> = Partial<{ [K in NestedKeyOf<T>]: any }>
type FilterOptions = { exclude?: boolean }

const defaultOptions: FilterOptions = { exclude: false }

function filterBy<T>(
  array: T[],
  determinant: Filter<T> | FilterAsObject<T> | [NestedKeyOf<T>, any],
  options: FilterOptions = defaultOptions
) {
  if (!determinant) return array

  const detType = typeof determinant

  if (detType === 'function') return _filterAsFunction(array, determinant)

  if (Array.isArray(determinant))
    return _filterAsArray(array, determinant, options)

  return _filterAsObject(array, determinant, options)
}

function _filterAsArray<T>(
  array: T[],
  determinant: any,
  { exclude }: FilterOptions = defaultOptions
) {
  return array.filter((dt) => {
    const [key, value] = determinant
    const dt_val = getDeepValue(dt as ObjectType, key)

    const allowed = isEqual(dt_val, value)

    return exclude ? !allowed : allowed
  })
}

function _filterAsFunction<T>(array: T[], determinant: any) {
  return array.filter((dt) => determinant(dt))
}

function _filterAsObject<T>(
  array: T[],
  determinant: any,
  { exclude }: FilterOptions = defaultOptions
) {
  return array.filter((dt) => {
    let allowed = isSubObjectEqual(dt as ObjectType, determinant)

    return exclude ? !allowed : allowed
  })
}

type Finder<T> = (item: T, index: number, array: T[]) => boolean
type FindAsObject<T> = Partial<{ [K in NestedKeyOf<T>]: any }>
type FindByOptions = { fromBack?: boolean }

function findBy<T>(
  array: T[],
  determinant: Finder<T> | FindAsObject<T> | [NestedKeyOf<T>, any],
  { fromBack }: FindByOptions = { fromBack: false }
) {
  const detType = typeof determinant

  let _array = [...array]
  if (fromBack) _array = _array.reverse()

  if (detType === 'function') return _array.find(determinant as Finder<T>)

  if (Array.isArray(determinant))
    return _array.find((dt) => {
      const [key, value] = determinant
      const dt_val = getDeepValue(dt as ObjectType, key)

      return isEqual(dt_val, value)
    })

  return _array.find((dt) => isSubObjectEqual(dt as ObjectType, determinant))
}

type GetListOptions = { unique?: boolean }

function getListOf<T, K extends any>(
  array: T[],
  key: NestedKeyOf<T>,
  { unique }: GetListOptions = { unique: false }
): K[] {
  const _array = array.map((dt) => getDeepValue(dt as ObjectType, key))

  return unique ? Array.from(new Set(_array)) : _array
}

type GetUniqueByOptions = { fromBack?: boolean }

function getUniqueBy<T>(
  array: T[],
  key?: NestedKeyOf<T>,
  { fromBack }: GetUniqueByOptions = { fromBack: false }
) {
  let _array = Array.from(array)

  if (fromBack) _array = _array.reverse()

  if (!key) return _getUnique(_array) as T[]

  let obj: ObjectType = {}

  _array.forEach((dt) => (obj[getDeepValue(dt as ObjectType, key)] = dt))

  return Object.values(obj) as T[]
}

function _serialize(dt: any, revert = false) {
  try {
    return revert ? JSON.parse(dt) : JSON.stringify(dt)
  } catch (err) {
    return dt
  }
}

function _getUnique<T>(array: T[]) {
  let _array = array.map((dt) => _serialize(dt))

  _array = Array.from(new Set(_array))

  return _array.map((dt) => _serialize(dt, true))
}

type Grouper<T> = (item: T) => ObjectKey
type GroupedMap<T, OutputKeys extends ObjectKey> = Record<OutputKeys, T[]>

function groupBy<T, OutputKeys extends ObjectKey = string>(
  array: T[],
  determinant: Grouper<T> | NestedKeyOf<T>
) {
  if (!array) return {} as GroupedMap<T, OutputKeys>

  const asFx = typeof determinant === 'function'

  return array.reduce((prev, next) => {
    const key = asFx
      ? (determinant(next) as NestedKeyOf<T>)
      : (getDeepValue(
          next as ObjectType,
          determinant as string
        ) as NestedKeyOf<T>)

    if (key === undefined) return prev

    // @ts-ignore
    prev.hasOwnProperty(key)
      ? // @ts-ignore
        prev[key].push(next)
      : // @ts-ignore
        (prev[key] = [next as any])

    return prev
  }, {} as GroupedMap<T, OutputKeys>)
}

function removeAt<T>(array: T[], start = 0, deleteCount = 1) {
  const newList = [...array]
  newList.splice(start, deleteCount)
  return newList
}

type Sorter<T> = (a: T, b: T) => -1 | 1
type SortOrder = 'asc' | 'desc'

function sortBy<T>(
  array: T[],
  determinant?: Sorter<T> | NestedKeyOf<T>,
  order: SortOrder = 'asc'
) {
  const _list = Array.from(array)
  if (!determinant) return _sortDelaut(_list, order)

  const detType = typeof determinant

  if (detType === 'function') return _list.sort(determinant as Sorter<T>)

  return _sortByKey(_list, determinant as string, order) as T[]
}

function _getSortOrder(order: SortOrder) {
  return order.toLowerCase() === 'asc' ? -1 : 1
}

function _sortByKey<T>(array: T[], key: string, order: SortOrder = 'asc') {
  return array.sort((a, b) => {
    const a_val = getDeepValue(a as ObjectType, key)
    const b_val = getDeepValue(b as ObjectType, key)

    let _order = _getSortOrder(order)

    return a_val < b_val ? _order : -_order
  })
}

function _sortDelaut<T>(list: T[], order: SortOrder = 'asc') {
  const _order = _getSortOrder(order)

  return list.sort((a, b) => (a < b ? _order : -_order))
}

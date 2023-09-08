import { NestedKeyOf, ObjectType } from '../types'
import { getDeepValue, isSubObjectEqual } from '../objects'
import { isEqual } from '../utils'

export { getUniqueBy } from './getUniqueBy'

export { countBy, findBy, getListOf, groupBy, removeAt, sortBy }

type Counter<T> = (item: T) => any

function countBy<T>(array: T[], determinant?: Counter<T> | NestedKeyOf<T>) {
  if (!array) return []

  if (!determinant) return _countInstances(array)

  const asFx = typeof determinant === 'function'

  return array.reduce((prev, next) => {
    const key = asFx
      ? determinant(next)
      : getDeepValue(next as ObjectType, determinant)

    return _incrementKey(key, prev)
  }, {} as ObjectType)
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

export function filterBy<T>(
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

type Grouper<T> = (item: T) => any
type GroupedMap<T> = Record<NestedKeyOf<T>, T[]>

function groupBy<T>(array: T[], determinant: Grouper<T> | NestedKeyOf<T>) {
  if (!array) return {} as GroupedMap<T>

  const asFx = typeof determinant === 'function'

  return array.reduce((prev, next) => {
    const key = asFx
      ? (determinant(next) as NestedKeyOf<T>)
      : (getDeepValue(
          next as ObjectType,
          determinant as string
        ) as NestedKeyOf<T>)

    if (key === undefined) return prev

    prev.hasOwnProperty(key) ? prev[key].push(next) : (prev[key] = [next])

    return prev
  }, {} as GroupedMap<T>)
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

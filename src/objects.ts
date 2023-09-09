import { ObjectType, NestedKeyOf } from './types'
import { isEqual, toArray } from './utils'

export {
  assignDeep,
  clone,
  getDeepValue,
  getDifference,
  getSubObject,
  hasDeepKey,
  isDeepKeyed,
  isSubObjectEqual,
  removeDeep
}

// helpers
const getKeys = (key: string | string[]) =>
  Array.isArray(key) ? key : key.split('.')

const hasProp = (obj: ObjectType | undefined = {}, prop = '') =>
  obj?.hasOwnProperty(prop)

// methods
function _assignDeep<T extends ObjectType>(
  data: T,
  key: NestedKeyOf<T> | string[],
  value: any
): ObjectType {
  key = getKeys(key)

  const _key = key.shift()! as keyof T

  if (!_key) return data

  if (!key.length) {
    data[_key] = value

    return data
  }

  if (!data?.[_key]) data[_key] = {} as any

  return { ...data, [_key]: _assignDeep(data[_key], key, value) }
}

function assignDeep<T extends ObjectType>(
  data: T,
  key: NestedKeyOf<T>,
  value: any
): ObjectType {
  return _assignDeep(data, key, value)
}

function clone<T>(dt: T): T {
  return dt === undefined ? dt : JSON.parse(JSON.stringify(dt))
}

function getDeepValue<T extends ObjectType>(data: T, key: NestedKeyOf<T>): any {
  return key.split('.').reduce((prev, next) => prev?.[next], data)
}

/**
 *
 * @param {object} a
 * @param {object} b
 * @returns an object with properties in a whose values are different from those in b
 */
function getDifference(a: ObjectType, b: ObjectType) {
  if (isEqual(a, b)) return {}

  const diff: ObjectType = {}

  for (let key in a) {
    if (isEqual(a[key], b[key])) continue

    diff[key] = a[key]
  }

  return diff
}

function getSubObject(obj: ObjectType, keys: string | string[] = []) {
  const _obj: ObjectType = {}

  keys = toArray(keys)

  for (const key of keys) assignDeep(_obj, key, getDeepValue(obj, key))

  return _obj
}

function _hasDeepKey<T extends ObjectType>(
  obj: T,
  key: NestedKeyOf<T> | string[]
): boolean {
  key = getKeys(key)

  const _key = key.shift()

  if (!_key || !obj) return false

  const keyFound = hasProp(obj, _key)

  if (!keyFound && key.length) return false

  if (keyFound && !key.length) return true

  return _hasDeepKey(obj?.[_key], key)
}

function hasDeepKey<T extends ObjectType>(obj: T, key: NestedKeyOf<T>) {
  return _hasDeepKey(obj, key)
}

function isDeepKeyed(obj: ObjectType) {
  return Object.keys(obj).some((key) => key.split('.').length > 1)
}

function isSubObjectEqual(dt: ObjectType, expected: ObjectType) {
  const keys = Object.keys(expected)

  const sub = getSubObject(dt as ObjectType, keys)

  if (!isDeepKeyed(expected)) return isEqual(sub, expected)

  const determinantObject = {} as ObjectType

  keys.forEach((key) => assignDeep(determinantObject, key, expected[key]))

  return isEqual(sub, determinantObject)
}

function _removeDeep<T extends ObjectType>(
  obj: T,
  key: string | string[]
): ObjectType {
  key = getKeys(key)

  const _key = key.shift()!

  if (!_key) return obj

  if (!key.length) {
    delete obj?.[_key]
    return obj
  }

  return { ...obj, [_key]: _removeDeep(obj[_key], key) }
}

function removeDeep<T extends ObjectType>(obj: T, key: NestedKeyOf<T>) {
  return _removeDeep(obj, key)
}

import { ObjectType } from './types'

export {
  capitalise,
  isEqual,
  isFunction,
  isKeyOf,
  isNullOrUndefined,
  isObject,
  isOneOf,
  setPadStart,
  sortArray,
  sortKeys,
  toArray,
  useIf
}

const capitaliseOne = (word: string) => {
  return word[0].toUpperCase() + word.slice(1).toLowerCase()
}

const capitalise = (value: string) => {
  if (typeof value !== 'string') return value

  const _value = value
  if (!_value.trim()) return value

  let _capitalised = ''

  value.split(' ').forEach((word, index) => {
    if (index !== 0) _capitalised += ' '
    _capitalised += capitaliseOne(word)
  })

  return _capitalised
}

/**
 * tell whether `a` & `b` are equals
 * @param {any} a
 * @param {any} b
 * @param {number|undefined} depth how deep in nesting should equality checks be performed for objects
 * @returns {boolean}
 */

function isEqual(a: any, b: any, depth: number = 1): boolean {
  const typeOfA = typeof a

  if (typeOfA != typeof b) return false

  if (typeOfA == 'undefined') return true

  if (['bigint', 'boolean', 'number', 'string', 'symbol'].includes(typeOfA))
    return a == b

  if (isNullOrUndefined(a) || isNullOrUndefined(b)) return a == b

  let keysOfA = Object.keys(a),
    keysOfB = Object.keys(b)

  if (keysOfA.length != keysOfB.length) return false
  ;(keysOfA = sortArray(keysOfA)), (keysOfB = sortArray(keysOfB))

  if (JSON.stringify(keysOfA) != JSON.stringify(keysOfB)) return false

  if (depth > 0 && keysOfA.length)
    return keysOfA.every((key) => isEqual(a[key], b[key], depth - 1))

  return JSON.stringify(sortKeys(a)) == JSON.stringify(sortKeys(b))
}

function isFunction(value: any): value is Function {
  return typeof value === 'function'
}

function isKeyOf(prop: string | number, object: any): prop is keyof object {
  return Object.hasOwnProperty.call(object, prop)
}

function isNullOrUndefined(value: any): value is null | undefined {
  return isOneOf(value, [null, undefined])
}

function isObject(value: any): value is ObjectType {
  return value && typeof value === 'object' && !Array.isArray(value)
}

function isOneOf<T>(value: any, values: T[]): value is T {
  return values.includes(value)
}

function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value]
}

function setPadStart(str: string | number = '', num = 2, symbol = '0') {
  return String(str).padStart(num, symbol)
}

function sortArray<T>(array: T[]) {
  return array.sort((a, b) => (a < b ? -1 : 1))
}

function sortKeys<T extends ObjectType>(object: T): T {
  return sortArray(Object.keys(object)).reduce((prev, next: keyof T) => {
    prev[next] = object[next]

    return prev
  }, {} as T)
}

function useIf(alternate: any, v: any, determinant?: (v: any) => boolean) {
  if (!determinant) return v ? v : alternate

  return determinant(v) ? alternate : v
}

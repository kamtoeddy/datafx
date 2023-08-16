const capitaliseOne = (word: string) => {
  return word[0].toUpperCase() + word.slice(1).toLowerCase()
}

export const capitalise = (value: string) => {
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

export function isEqual(a: any, b: any) {
  const typeOf_a = typeof a

  if (typeOf_a !== typeof b) return false

  if (typeOf_a === 'undefined') return true

  if (['bigint', 'boolean', 'number', 'string', 'symbol'].includes(typeOf_a))
    a == b

  return JSON.stringify(a) == JSON.stringify(b)
}

export function setPadStart(str: string | number = '', num = 2, symbol = '0') {
  return String(str).padStart(num, symbol)
}

export const toArray = (data: any) => (Array.isArray(data) ? data : [data])

export const useIf = (
  alternate: any,
  v: any,
  determinant?: (v: any) => boolean
) => {
  if (!determinant) return v ? v : alternate

  return determinant(v) ? alternate : v
}

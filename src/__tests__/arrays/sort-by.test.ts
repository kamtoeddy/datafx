import { describe, it, expect } from 'vitest'

import { sortBy } from '../../../dist'

import { users } from './test-data'
const arrays = [
  [11, 4, 6, 3, 7],
  ['2', '4t', 'hey'],
  [{ name: 'James' }, { name: 'Mary' }, { name: 'Bob' }, { name: 'Doe' }]
]

type Person = {
  name: string
}

const sortPersonsByName = (a: Person, b: Person) => (a.name < b.name ? -1 : 1)

describe('sortBy', () => {
  it('should return an array of same size', () => {
    for (let arr of arrays) expect(sortBy(arr as any).length).toBe(arr.length)
  })

  it('should apply ascending order for sorting by default', () => {
    expect(sortBy(arrays[0] as number[])).toStrictEqual([3, 4, 6, 7, 11])
  })

  it('should sort by descending order when specified', () => {
    expect(sortBy([...arrays[0]], null as any, 'desc')).toEqual([
      11, 7, 6, 4, 3
    ])
  })

  it('should sort by custom determinant function', () => {
    const sorted = sortBy(arrays[2] as Person[], sortPersonsByName)

    expect(sorted[0]).toStrictEqual({ name: 'Bob' })
    expect(sorted[1]).toStrictEqual({ name: 'Doe' })
    expect(sorted[2]).toStrictEqual({ name: 'James' })
    expect(sorted[3]).toStrictEqual({ name: 'Mary' })
  })

  it('should sort by key of objects in array', () => {
    const sorted = sortBy(users, 'name')

    expect(sorted[0]).toMatchObject({ id: 1, name: 'James' })
    expect(sorted[1]).toMatchObject({ id: 1, name: 'James' })
    expect(sorted[2]).toMatchObject({ id: 2, name: 'Mary' })
    expect(sorted[3]).toMatchObject({ id: 3, name: 'Peter' })
  })

  it('should sort by nested key of objects in array', () => {
    const sorted = sortBy(users, 'bio.facebook.displayName')

    expect(sorted[0].bio.facebook.displayName).toBe('james-1')
    expect(sorted[1].bio.facebook.displayName).toBe('james-2')
    expect(sorted[2].bio.facebook.displayName).toBe('mary-jane')
    expect(sorted[3].bio.facebook.displayName).toBe('mr_p')
  })
})

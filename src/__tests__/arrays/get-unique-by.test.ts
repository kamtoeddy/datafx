import { describe, it, expect } from 'vitest'

import { getUniqueBy } from '../../../dist'

describe('getUniqueBy', () => {
  it('should return an array of unique values without a key', () => {
    const values = [
      11,
      1,
      { name: 'James' },
      { name: 'Mary' },
      2,
      { name: 'James' },
      1
    ]

    expect(getUniqueBy([]).length).toBe(0)
    expect(getUniqueBy(values).length).toBe(5)
  })

  it('should return an array of unique values with a key', () => {
    const values = [{ name: 'James' }, { name: 'Mary' }, { name: 'James' }]

    expect(getUniqueBy(values, 'name').length).toBe(2)
    expect((getUniqueBy as any)(values, 'age').length).toBe(1)
  })

  it('should return an array of unique values with a nested key', () => {
    const values = [
      { name: 'James', bio: { followers: 300 } },
      { name: 'Mary', bio: { followers: 275 } },
      { name: 'Bob', bio: { followers: 300 } },
      { name: 'James', bio: { followers: 220 } },
      { name: 'Doe', bio: { followers: 250 } }
    ]

    expect(getUniqueBy(values, 'bio.followers').length).toBe(4)
  })

  it('should respect the fromBack option', () => {
    const values = [1, 2, 4, 74, 40, -34, 0, 10]

    expect(getUniqueBy(values, undefined, { fromBack: true })).toEqual(
      [...values].reverse()
    )
  })
})

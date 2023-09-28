import { describe, it, expect } from 'vitest'

import { findBy } from '../../../dist'

import { users } from './test-data'

describe('findBy', () => {
  it('should find by object determinant', () => {
    const determinants = [{ age: 10 }, { id: 1 }, { name: 'James' }]
    for (const determinant of determinants)
      expect(findBy(users, determinant)).toMatchObject(users[0])

    expect(findBy(users, { age: 11, id: 2, name: 'Mary' })).toMatchObject(
      users[1]
    )
  })

  it('should find by object determinant with nested keys', () => {
    const determinants = [
      { 'bio.facebook.displayName': 'mary-jane' },
      { age: 11, 'bio.facebook.displayName': 'mary-jane' }
    ]

    for (const determinant of determinants)
      expect(findBy(users, determinant)).toMatchObject(users[1])
  })

  it('should find by array determinant', () => {
    const determinants = [
      ['age', 11],
      ['id', 2],
      ['name', 'Mary'],
      ['bio.facebook.displayName', 'mary-jane']
    ] as any[]

    for (const determinant of determinants)
      expect(findBy(users, determinant)).toMatchObject(users[1])
  })

  it('should find by function determinant', () => {
    const determinants = [
      [(dt: any) => dt.id === 1, users[0]],
      [(dt: any) => dt.name === 'Mary', users[1]]
    ]

    for (const [det, value] of determinants)
      expect(findBy(users, det)).toMatchObject(value)
  })

  it('should respect `fromBack` option', () => {
    const determinants = [
      [(dt: any) => dt.id === 1, users[3]],
      [(dt: any) => dt.name === 'Mary', users[1]]
    ]

    for (const [det, value] of determinants)
      expect(findBy(users, det, { fromBack: true })).toMatchObject(value)
  })
})

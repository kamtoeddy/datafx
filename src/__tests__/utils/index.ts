import { describe, it, expect } from 'vitest'

export const capitalise_Tests = ({ capitalise }: { capitalise: Function }) => {
  describe('capitalize', () => {
    it('should return a string in capital leters', () => {
      expect(capitalise('a')).toBe('A')
      expect(capitalise('a doG')).toBe('A Dog')
      expect(capitalise('a-doG')).toBe('A-dog')
    })

    it("should return a same value if it's not a string or is empty", () => {
      const values = [null, undefined, [], 1, '  ', '']

      for (const value of values) expect(capitalise(value)).toBe(value)
    })
  })
}

export const isEqual_Tests = ({ isEqual }: { isEqual: Function }) => {
  describe('isEqual', () => {
    it('should return true if a and b are equal else false', () => {
      // truthy
      const now = new Date()
      expect(isEqual(now, now)).toBe(true)
      expect(isEqual(1, 1)).toBe(true)
      expect(isEqual({}, {})).toBe(true)
      expect(isEqual([], [])).toBe(true)
      expect(isEqual(undefined, undefined)).toBe(true)
      expect(isEqual([1, 'true', [], null], [1, 'true', [], null])).toBe(true)
      expect(isEqual({ a: 'James' }, { a: 'James' })).toBe(true)
      expect(isEqual({ a: '' }, { a: '' })).toBe(true)
      expect(isEqual({ a: '', b: '' }, { a: '', b: '' })).toBe(true)
      expect(isEqual({ a: '', b: '' }, { b: '', a: '' })).toBe(true)
      expect(isEqual({ a: '', b: { c: '' } }, { b: { c: '' }, a: '' })).toBe(
        true
      )

      // falsy
      expect(
        isEqual(now, new Date(new Date(now).setHours(now.getHours() + 10)))
      ).toBe(false)
      expect(isEqual(1, '1')).toBe(false)
      expect(isEqual({}, '1')).toBe(false)
      expect(isEqual([1, 'true', []], [1, 'true', '[]'])).toBe(false)
      expect(isEqual([1, 'true', [], null], [1, 'true', null, []])).toBe(false)
      expect(isEqual({ a: 'James' }, { a: 'JameS' })).toBe(false)
      expect(isEqual({ a: 'James' }, { a: 'James', b: 17 })).toBe(false)
    })

    it('should respect the level of nesting(depth)', () => {
      // depth == undefined (defaults to 1)

      for (const depth of [undefined, 1]) {
        expect(
          isEqual({ a: '', b: { c: '' } }, { b: { c: '' }, a: '' }, depth)
        ).toEqual(true)

        expect(
          isEqual({ a: '', b: [1, 2] }, { b: [1, 2], a: '' }, depth)
        ).toEqual(true)

        expect(
          isEqual(
            { a: '', b: { c: '', d: [1, 2] } },
            { b: { d: [1, 2], c: '' }, a: '' },
            depth
          )
        ).toEqual(true)

        expect(
          isEqual(
            { a: '', b: { d: '', c: '' } },
            { b: { c: '', d: '' }, a: '' },
            depth
          )
        ).toEqual(true)
      }

      // depth == 0
      expect(
        isEqual({ a: '', b: { c: '' } }, { b: { c: '' }, a: '' }, 0)
      ).toEqual(true)

      expect(isEqual({ a: '', b: [1, 2] }, { b: [1, 2], a: '' }, 0)).toEqual(
        true
      )

      expect(
        isEqual(
          { a: '', b: { c: '', d: [1, 2] } },
          { b: { d: [1, 2], c: '' }, a: '' },
          0
        )
      ).toEqual(false)

      expect(
        isEqual(
          { a: '', b: { d: '', c: '' } },
          { b: { c: '', d: '' }, a: '' },
          0
        )
      ).toEqual(false)

      for (const depth of [2, 3, Infinity]) {
        expect(
          isEqual({ a: '', b: { c: '' } }, { b: { c: '' }, a: '' }, depth)
        ).toEqual(true)

        expect(
          isEqual({ a: '', b: [1, 2] }, { b: [1, 2], a: '' }, depth)
        ).toEqual(true)

        expect(
          isEqual(
            { a: '', b: { c: '', d: [1, 2] } },
            { b: { d: [1, 2], c: '' }, a: '' },
            depth
          )
        ).toEqual(true)

        expect(
          isEqual(
            { a: '', b: { d: '', c: '' } },
            { b: { c: '', d: '' }, a: '' },
            depth
          )
        ).toEqual(true)
      }
    })
  })
}

export const useIf_Tests = ({ useIf }: { useIf: Function }) => {
  describe('useIf', () => {
    it('should return a string in capital leters', () => {
      expect(useIf(1, 0)).toBe(1)
      expect(useIf(false, undefined)).toBe(false)
      expect(useIf('It is NaN', '-', isNaN)).toBe('It is NaN')
    })
  })
}

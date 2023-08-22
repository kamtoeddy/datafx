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
      expect(isEqual(1, 1)).toEqual(true)
      expect(isEqual({}, {})).toEqual(true)
      expect(isEqual([], [])).toEqual(true)
      expect(isEqual(undefined, undefined)).toEqual(true)
      expect(isEqual([1, 'true', [], null], [1, 'true', [], null])).toEqual(
        true
      )
      expect(isEqual({ a: 'James' }, { a: 'James' })).toEqual(true)
      expect(isEqual({ a: '' }, { a: '' })).toEqual(true)
      expect(isEqual({ a: '', b: '' }, { a: '', b: '' })).toEqual(true)
      expect(isEqual({ a: '', b: '' }, { b: '', a: '' })).toEqual(true)
      expect(isEqual({ a: '', b: { c: '' } }, { b: { c: '' }, a: '' })).toEqual(
        true
      )

      // falsy
      expect(isEqual(1, '1')).toEqual(false)
      expect(isEqual({}, '1')).toEqual(false)
      expect(isEqual([1, 'true', []], [1, 'true', '[]'])).toEqual(false)
      expect(isEqual([1, 'true', [], null], [1, 'true', null, []])).toEqual(
        false
      )
      expect(isEqual({ a: 'James' }, { a: 'JameS' })).toEqual(false)
      expect(isEqual({ a: 'James' }, { a: 'James', b: 17 })).toEqual(false)
      expect(
        isEqual({ a: '', b: { d: '', c: '' } }, { b: { c: '', d: '' }, a: '' })
      ).toEqual(false)
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

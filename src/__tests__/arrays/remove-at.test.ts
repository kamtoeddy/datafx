import { describe, it, expect } from 'vitest';

import { removeAt } from '../../../src';

describe('removeAt', () => {
  const arr = [1, 2, 3, 4, 5, -45];

  it('should remove the first item with no startIndex & no deleteCount', () => {
    expect(removeAt([...arr])).toEqual([2, 3, 4, 5, -45]);
  });

  it('should remove items at specified indices', () => {
    const values = [
      [[...arr], 0, 1, [2, 3, 4, 5, -45]],
      [[...arr], 0, undefined, [2, 3, 4, 5, -45]],
      [[...arr], undefined, undefined, [2, 3, 4, 5, -45]],
      [[...arr], 1, 3, [1, 5, -45]],
      [[...arr], 4, 5, [1, 2, 3, 4]]
    ] as any[];

    for (const [dt, start, count, result] of values) {
      const newArr = removeAt(dt, start, count);
      expect(Array.isArray(newArr)).toBe(true);
      expect(newArr).toEqual(result);
    }
  });
});

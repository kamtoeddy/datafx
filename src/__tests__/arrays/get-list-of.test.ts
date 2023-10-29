import { describe, it, expect } from 'vitest';

import { getListOf } from '../../../src';

import { users } from './test-data';

describe('getListOf', () => {
  it('should list by a property', () => {
    expect(getListOf(users, 'name').length).toBe(4);
  });

  it('should list with unique values', () => {
    expect(getListOf(users, 'name', { unique: true }).length).toBe(3);
  });

  it('should list with values other than objects', () => {
    const listOfUniqueNames = getListOf(
      ['one', 'three', 'five', 'seven'],
      'length'
    );

    expect(listOfUniqueNames.length).toBe(4);
    expect(listOfUniqueNames).toEqual(expect.arrayContaining([3, 5, 4, 5]));
  });
});

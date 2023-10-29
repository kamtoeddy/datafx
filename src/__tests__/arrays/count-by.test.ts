import { describe, it, expect } from 'vitest';

import { countBy } from '../../../src';

import { users } from './test-data';

describe('countBy', () => {
  it('should return an empty object if non list is provided', () => {
    const values = [null, undefined, true, false, 0, 1, {}];

    for (const value of values)
      expect((countBy as any)(value)).toMatchObject({});
  });

  it('should count with any type', () => {
    const counted = countBy([
      null,
      'a',
      null,
      1,
      2,
      1,
      'a',
      null,
      undefined,
      null
    ]);

    expect(counted).toMatchObject({
      null: 4,
      a: 2,
      1: 2,
      2: 1,
      undefined: 1
    });
  });

  it('should count objects by properties', () => {
    const counted = countBy(users, 'name');

    expect(counted).toMatchObject({ James: 2, Mary: 1, Peter: 1 });
  });

  it('should count objects by nested properties', () => {
    const counted = countBy(users, 'bio.facebook.link');

    expect(counted).toMatchObject({
      '/facebook/james': 2,
      '/facebook/mary': 1,
      '/facebook/peter': 1
    });
  });

  it('should count by counter function', () => {
    const counter = (item: any) =>
      typeof item === 'object' && item ? 'object' : item;

    const counted = countBy(
      [null, 'a', null, 1, 2, 1, 'a', null, undefined, null, ...users],
      counter
    );

    expect(counted).toMatchObject({
      1: 2,
      2: 1,
      a: 2,
      null: 4,
      object: users.length,
      undefined: 1
    });
  });
});

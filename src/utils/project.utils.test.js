import { describe, it, expect } from 'vitest';
import { sanitizeFeaturedValue } from './project.utils.js';

describe('Fonction sanitizeFeaturedValue', () => {
  it('doit retourner 1 si la valeur est le booléen true', () => {
    expect(sanitizeFeaturedValue(true)).toBe(1);
  });

  it('doit retourner 1 si la valeur est la chaîne "true"', () => {
    expect(sanitizeFeaturedValue('true')).toBe(1);
  });

  it('doit retourner 0 pour false', () => {
    expect(sanitizeFeaturedValue(false)).toBe(0);
  });
});
import { describe, it, expect } from 'vitest';
import Funko, { FunkoGender, FunkoType } from '../src/funko.js';

describe('Funko', () => {

  it('should create a Funko object', () => {
    const funko: Funko = {
      id: 1,
      name: 'Spider',
      description: 'Spiderman Funko',
      type: FunkoType.POP,
      gender: FunkoGender.MOVIE_TV,
      franchise: 'Marvel',
      number: 1,
      exclusive: false,
      specialCharacteristics: 'Spider web',
      price: 10
    };
    expect(funko.id).toBe(1);
    expect(funko.name).toBe('Spider');
    expect(funko.description).toBe('Spiderman Funko');
    expect(funko.type).toBe(FunkoType.POP);
    expect(funko.gender).toBe(FunkoGender.MOVIE_TV);
    expect(funko.franchise).toBe('Marvel');
    expect(funko.number).toBe(1);
    expect(funko.exclusive).toBe(false);
    expect(funko.specialCharacteristics).toBe('Spider web');
    expect(funko.price).toBe(10);
  });
  
});

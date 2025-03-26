import { describe, it, expect, vi, test } from 'vitest';
import FunkoMangment from '../src/funkoManagment';
import Funko, { FunkoGender, FunkoType } from '../src/funko';
import fs from 'fs';

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
  price: 9
};

const funko2: Funko = {
  id: 2,
  name: 'Batman',
  description: 'Batman Funko',
  type: FunkoType.POP,
  gender: FunkoGender.MOVIE_TV,
  franchise: 'DC',
  number: 2,
  exclusive: true,
  specialCharacteristics: 'Batarang',
  price: 15
};

const funko_mod: Funko = {
  id: 1,
  name: 'Iron Man',
  description: 'Iron Man Funko',
  type: FunkoType.POP,
  gender: FunkoGender.MOVIE_TV,
  franchise: 'Marvel',
  number: 3,
  exclusive: false,
  specialCharacteristics: 'Repulsor Blasts',
  price: 32
};

const funko3: Funko = {
  id: 3,
  name: 'Wonder Woman',
  description: 'Wonder Woman Funko',
  type: FunkoType.POP,
  gender: FunkoGender.MOVIE_TV,
  franchise: 'DC',
  number: 4,
  exclusive: true,
  specialCharacteristics: 'Lasso of Truth',
  price: 55
};

const consoleSpy = vi.spyOn(console, 'log');
const funkoManagment = FunkoMangment.getInstance();

describe('FunkoManagment', () => {

  test('should create a FunkoManagment object', () => {
    expect(funkoManagment).toBeDefined();
  });
});
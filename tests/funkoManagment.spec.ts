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

  test('should create a new Funko', () => {
    funkoManagment.createFunko('testuser', funko);
    expect(consoleSpy).toHaveBeenCalledWith('New Funko created in testuser collection!');
    funkoManagment.createFunko('testuser', funko2);
    expect(consoleSpy).toHaveBeenCalledWith('New Funko created in testuser collection!');
    // consoleSpy.mockRestore();
  });

  it('should not create an existing Funko', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    funkoManagment.createFunko('testuser', funko);
    expect(consoleSpy).toHaveBeenCalledWith('Funko already exists');
    funkoManagment.createFunko('testuser', funko2);
    expect(consoleSpy).toHaveBeenCalledWith('Funko already exists');
  });

  it('should update an existing Funko', () => {
    funkoManagment.updateFunko('testuser', funko_mod);
    expect(consoleSpy).toHaveBeenCalledWith('Funko updated in testuser collection!');
  });

  it('should not update a non-existing Funko', () => {
    funkoManagment.updateFunko('testuser', funko3);
    expect(consoleSpy).toHaveBeenCalledWith('Funko not found in testuser collection!');
  });

  it('should search a Funko', () => {
    const consoleSpy = vi.spyOn(funkoManagment, 'readFunko');
    funkoManagment.readFunko('testuser', 1);
    expect(consoleSpy).toHaveBeenCalledWith('testuser', 1);
    funkoManagment.readFunko('testuser', 2);
    expect(consoleSpy).toHaveBeenCalledWith('testuser', 2);
  });

  it('shouldnt search a non-existing Funko', () => {
    funkoManagment.readFunko('testuser', 3);
    expect(consoleSpy).toHaveBeenCalledWith('Funko not found in testuser collection!');
  });

  it('should list all Funkos', () => {
    funkoManagment.updateFunko('testuser', funko);
    funkoManagment.createFunko('testuser', funko3);
    const consoleSpy = vi.spyOn(funkoManagment, 'listFunkos');
    funkoManagment.listFunkos('testuser');
    expect(consoleSpy).toHaveBeenCalledWith('testuser');
  });

  it('shouldnt list all Funkos for a non-existing user', () => {
    funkoManagment.listFunkos('testuser2');
    expect(consoleSpy).toHaveBeenCalledWith('User not found');
  });

  it('should delete a Funko', () => {
    // const consoleSpy = vi.spyOn(funkoManagment, 'deleteFunko');
    funkoManagment.deleteFunko('testuser', 1);
    expect(consoleSpy).toHaveBeenCalledWith('Funko deleted from testuser collection!');
  });

  it('shouldnt delete a non-existing Funko', () => {
    funkoManagment.deleteFunko('testuser', 4);
    expect(consoleSpy).toHaveBeenCalledWith('Funko not found in testuser collection!');
  });

  it('delete a user directory', () => {
    fs.rmdirSync('./funkos/testuser', { recursive: true });
  });
});
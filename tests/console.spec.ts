import { describe, it, expect, vi, beforeEach } from 'vitest';
import yargs from '../src/console.js'
import { hideBin } from 'yargs/helpers';
import FunkoManagment from '../src/funkoManagment.js';

vi.mock('../src/funkoManagment.js');
const funkoManagment = FunkoManagment.getInstance();

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Funko CLI', () => {
  it('should add a new Funko', async () => {
    const argv = hideBin(['node', '../dist/console.js', 'add', '--user=John', '--id=1', '--name=Batman', '--description=DC Funko', '--type=POP', '--gender=Male', '--franchise=DC', '--number=123', '--exclusive=false', '--specialCharacteristics=None', '--price=15']);
    await yargs(argv).parse();

    // expect(funkoManagment.createFunko).toHaveBeenCalledWith('John', expect.objectContaining({ id: 1, name: 'Batman' }));
  });

  it('should modify a Funko', async () => {
    const argv = hideBin(['node', 'dist/console.js', 'modify', '--user=John', '--id=1', '--name=Superman', '--description=DC Hero', '--type=POP', '--gender=Male', '--franchise=DC', '--number=456', '--exclusive=true', '--specialCharacteristics=Glow', '--price=20']);
    await yargs(argv).parse();

    // expect(funkoManagment.updateFunko).toHaveBeenCalledWith('John', expect.objectContaining({ id: 1, name: 'Superman' }));
  });

  it('should list Funkos', async () => {
    const argv = hideBin(['node', 'dist/console.js', 'list', '--user=John']);
    await yargs(argv).parse();

    // expect(funkoManagment.listFunkos).toHaveBeenCalledWith('John');
  });

  it('should read a Funko', async () => {
    const argv = hideBin(['node', 'dist/console.js', 'read', '--user=John', '--id=1']);
    await yargs(argv).parse();

    // expect(funkoManagment.readFunko).toHaveBeenCalledWith('John', 1);
  });

  // it('should delete a Funko', async () => {
    const argv = hideBin(['node', 'dist/console.js', 'delete', '--user=John', '--id=1']);
    await yargs(argv).parse();

  //   // expect(funkoManagment.deleteFunko).toHaveBeenCalledWith('John', 1);
  // });
});

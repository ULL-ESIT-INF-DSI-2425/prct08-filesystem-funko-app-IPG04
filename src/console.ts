import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import Funko, { FunkoGender, FunkoType } from "./funko.js";
import FunkoManagment from "./funkoManagment.js";

/**
 * CLI command handler using Yargs to manage Funkos.
 * Provides functionality to add, modify, delete, list, and read Funko collections.
 */
export default yargs(hideBin(process.argv))

  /**
   * Command to add a new Funko to a user's collection.
   */
  .command(
    'add',
    'Add a new Funko',
    {
      user: { description: 'User name', type: 'string', demandOption: true },
      id: { description: 'Funko ID', type: 'number', demandOption: true },
      name: { description: 'Funko name', type: 'string', demandOption: true },
      description: { description: 'Funko description', type: 'string', demandOption: true },
      type: { description: 'Funko type', type: 'string', demandOption: true },
      gender: { description: 'Funko gender', type: 'string', demandOption: true },
      franchise: { description: 'Funko franchise', type: 'string', demandOption: true },
      number: { description: 'Funko franchise number', type: 'number', demandOption: true },
      exclusive: { description: 'Funko exclusive', type: 'boolean', demandOption: true },
      specialCharacteristics: { description: 'Funko special characteristics', type: 'string', demandOption: true },
      price: { description: 'Funko price', type: 'number', demandOption: true }
    },
    (argv) => {
      const funko: Funko = {
        id: argv.id,
        name: argv.name,
        description: argv.description,
        type: argv.type as FunkoType,
        gender: argv.gender as FunkoGender,
        franchise: argv.franchise,
        number: argv.number,
        exclusive: argv.exclusive,
        specialCharacteristics: argv.specialCharacteristics,
        price: argv.price
      };
      FunkoManagment.getInstance().createFunko(argv.user, funko);
    }
  )

  /**
   * Command to modify an existing Funko in a user's collection.
   */
  .command(
    'modify',
    'Modify a Funko',
    {
      user: { description: 'User name', type: 'string', demandOption: true },
      id: { description: 'Funko ID', type: 'number', demandOption: true },
      name: { description: 'Funko name', type: 'string', demandOption: true },
      description: { description: 'Funko description', type: 'string', demandOption: true },
      type: { description: 'Funko type', type: 'string', demandOption: true },
      gender: { description: 'Funko gender', type: 'string', demandOption: true },
      franchise: { description: 'Funko franchise', type: 'string', demandOption: true },
      number: { description: 'Funko franchise number', type: 'number', demandOption: true },
      exclusive: { description: 'Funko exclusive', type: 'boolean', demandOption: true },
      specialCharacteristics: { description: 'Funko special characteristics', type: 'string', demandOption: true },
      price: { description: 'Funko price', type: 'number', demandOption: true }
    },
    (argv) => {
      const funko: Funko = {
        id: argv.id,
        name: argv.name,
        description: argv.description,
        type: argv.type as FunkoType,
        gender: argv.gender as FunkoGender,
        franchise: argv.franchise,
        number: argv.number,
        exclusive: argv.exclusive,
        specialCharacteristics: argv.specialCharacteristics,
        price: argv.price
      };
      FunkoManagment.getInstance().updateFunko(argv.user, funko);
    }
  )

  /**
   * Command to delete a Funko from a user's collection.
   */
  .command(
    'delete',
    'Delete a Funko',
    {
      user: { description: 'User name', type: 'string', demandOption: true },
      id: { description: 'Funko ID', type: 'number', demandOption: true }
    },
    (argv) => {
      FunkoManagment.getInstance().deleteFunko(argv.user, argv.id);
    }
  )

  /**
   * Command to list all Funkos in a user's collection.
   */
  .command(
    'list',
    'List all Funkos',
    {
      user: { description: 'User name', type: 'string', demandOption: true }
    },
    (argv) => {
      FunkoManagment.getInstance().listFunkos(argv.user);
    }
  )

  /**
   * Command to read a specific Funko's details from a user's collection.
   */
  .command(
    'read',
    'Read a Funko',
    {
      user: { description: 'User name', type: 'string', demandOption: true },
      id: { description: 'Funko ID', type: 'number', demandOption: true }
    },
    (argv) => {
      FunkoManagment.getInstance().readFunko(argv.user, argv.id);
    }
  )

  .help()
  .argv;

// node dist/app.js add --user "ipg" --id 1 --name "funko 1" --description "mi primer funko" --type "Pop!" --gender "Sport" --franchise "f1" --number 1 --exclusive true --specialCharacteristics "" --price 9

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import Funko, { FunkoGender, FunkoType } from "./funko.js";
import FunkoManagment from "./funkoManagment.js";

const funkoArguments = {
  user: { description: 'User name', type: 'string', demandOption: true } as const,
  id: { description: 'Funko ID', type: 'number', demandOption: true } as const,
  name: { description: 'Funko name', type: 'string', demandOption: true } as const,
  description: { description: 'Funko description', type: 'string', demandOption: true } as const,
  type: { description: 'Funko type', type: 'string', choices: Object.values(FunkoType) as string[], demandOption: true } as const,
  gender: { description: 'Funko gender', type: 'string', choices: Object.values(FunkoGender) as string[], demandOption: true } as const,
  franchise: { description: 'Funko franchise', type: 'string', demandOption: true } as const,
  number: { description: 'Funko franchise number', type: 'number', demandOption: true } as const,
  exclusive: { description: 'Funko exclusive', type: 'boolean', demandOption: true } as const,
  specialCharacteristics: { description: 'Funko special characteristics', type: 'string', demandOption: true } as const,
  price: { description: 'Funko price', type: 'number', demandOption: true } as const
} as const;

/**
 * Validates the input arguments and creates a new Funko object.
 * @param argv - The input arguments.
 * @returns A new Funko object.
 * @throws An error if the price is negative.
 */
function validateAndCreateFunko(argv: any): Funko {
  if (argv.price < 0) {
    throw new Error('Price must be a positive number');
  }
  return {
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
}

/**
 * CLI command handler using Yargs to manage Funkos.
 * Provides functionality to add, modify, delete, list, and read Funko collections.
 */
const argv = yargs(hideBin(process.argv))

  /**
   * Command to add a new Funko to a user's collection.
   */
  .command('add', 'Add a new Funko', funkoArguments, (argv) => {
    FunkoManagment.getInstance().createFunko(argv.user, validateAndCreateFunko(argv));
  })

  /**
   * Command to modify an existing Funko in a user's collection.
   */
  .command('modify', 'Modify a Funko', funkoArguments, (argv) => {
    FunkoManagment.getInstance().updateFunko(argv.user, validateAndCreateFunko(argv));
  })

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

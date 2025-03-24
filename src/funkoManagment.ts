import fs from 'fs';
import Funko from './funko.js';
import FunkoPrint from './funkoPrint.js';
import chalk from 'chalk';

/**
 * Manages Funko collections for users.
 * Provides functionalities to create, update, delete, read, and list Funkos stored as JSON files.
 */
export default class FunkoManagment {
  private static instance: FunkoManagment;

  private constructor() { }

  /**
   * Gets the singleton instance of FunkoManagment.
   * @returns The instance of FunkoManagment.
   */
  public static getInstance(): FunkoManagment {
    if (!FunkoManagment.instance) {
      FunkoManagment.instance = new FunkoManagment();
    }
    return FunkoManagment.instance;
  }

  /**
   * Checks if a Funko exists in a user's collection.
   * @param user - The user's name.
   * @param id - The Funko's ID.
   * @returns `true` if the Funko exists, `false` otherwise.
   */
  private funkoExists(user: string, id: number): boolean {
    return fs.existsSync(`./funkos/${user}/${id}.json`);
  }

  /**
   * Creates a new Funko in the user's collection.
   * If the Funko already exists, an error message is displayed.
   * @param user - The user's name.
   * @param funko - The Funko object to add.
   */
  public createFunko(user: string, funko: Funko) {
    if (this.funkoExists(user, funko.id)) {
      console.log(chalk.red('Funko already exists'));
    } else {
      if (!fs.existsSync(`./funkos/${user}`)) {
        fs.mkdirSync(`./funkos/${user}`);
      }
      fs.writeFile(`./funkos/${user}/${funko.id}.json`, JSON.stringify(funko), () => {
        console.log(chalk.green(`New Funko created in ${user} collection!`));
      });
    }
  }

  /**
   * Updates an existing Funko in the user's collection.
   * If the Funko does not exist, an error message is displayed.
   * @param user - The user's name.
   * @param funko - The updated Funko object.
   */
  public updateFunko(user: string, funko: Funko) {
    if (this.funkoExists(user, funko.id)) {
      fs.writeFile(`./funkos/${user}/${funko.id}.json`, JSON.stringify(funko), () => {
        console.log(chalk.green(`Funko updated in ${user} collection!`));
      });
    } else {
      console.log(chalk.red(`Funko not found in ${user} collection!`));
    }
  }

  /**
   * Deletes a Funko from the user's collection.
   * If the Funko does not exist, an error message is displayed.
   * @param user - The user's name.
   * @param id - The ID of the Funko to delete.
   */
  public deleteFunko(user: string, id: number) {
    if (this.funkoExists(user, id)) {
      fs.unlink(`./funkos/${user}/${id}.json`, () => {
        console.log(chalk.green(`Funko deleted from ${user} collection!`));
      });
    } else {
      console.log(chalk.red(`Funko not found in ${user} collection!`));
    }
  }

  /**
   * Reads and displays the details of a Funko from the user's collection.
   * If the Funko does not exist, an error message is displayed.
   * @param user - The user's name.
   * @param id - The ID of the Funko to read.
   */
  public readFunko(user: string, id: number) {
    if (this.funkoExists(user, id)) {
      fs.readFile(`./funkos/${user}/${id}.json`, 'utf-8', (err, data) => {
        if (!err) {
          FunkoPrint.printFunko(JSON.parse(data));
        }
      });
    } else {
      console.log(chalk.red(`Funko not found in ${user} collection!`));
    }
  }

  /**
   * Lists all Funkos in a user's collection.
   * If the user has no Funkos, an error message is displayed.
   * @param user - The user's name.
   */
  public listFunkos(user: string) {
    fs.readdir(`./funkos/${user}/`, (err, files) => {
      if (err) {
        console.log(chalk.red('No Funkos found'));
      } else {
        console.log(chalk.green(`${user} collection:`));
        files.forEach((file) => {
          fs.readFile(`./funkos/${user}/${file}`, 'utf-8', (err, data) => {
            if (!err) {
              console.log('-------------------');
              FunkoPrint.printFunko(JSON.parse(data));
            }
          });
        });
      }
    });
  }
}

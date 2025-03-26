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
   * Creates a new Funko in the user's collection.
   * If the Funko already exists, an error message is displayed.
   * @param user - The user's name.
   * @param funko - The Funko object to add.
   */
  public createFunko(user: string, funko: Funko) {
    let funkoExists = false;
    fs.access(`./funkos/${user}/${funko.id}.json`, (error) => {
      if (!error) {
        funkoExists = true;
      }
    });
    setTimeout(() => { 
      if (funkoExists) {
        console.log(chalk.red('Funko already exists'));
      } else {
        fs.access(`./funkos/${user}`, (error) => {
          if (error) {
            fs.mkdir(`./funkos/${user}`, () => {});
          }
          fs.writeFile(`./funkos/${user}/${funko.id}.json`, JSON.stringify(funko, null, 2), () => {
            console.log(chalk.green(`New Funko created in ${user} collection!`));
            });
          });
        }
      }, 100);
    }

  /**
   * Updates an existing Funko in the user's collection.
   * If the Funko does not exist, an error message is displayed.
   * @param user - The user's name.
   * @param funko - The updated Funko object.
   */
  public updateFunko(user: string, funko: Funko) {
    let funkoExists = false;
    fs.access(`./funkos/${user}/${funko.id}.json`, (error) => {
      if (!error) {
        funkoExists = true;
      }
    });
    setTimeout(() => {
      if (funkoExists) {
        fs.writeFile(`./funkos/${user}/${funko.id}.json`, JSON.stringify(funko, null, 2), () => {
          console.log(chalk.green(`Funko updated in ${user} collection!`));
        });
      } else {
        console.log(chalk.red(`Funko not found in ${user} collection!`));
      }
    }, 100);
  }

  /**
   * Deletes a Funko from the user's collection.
   * If the Funko does not exist, an error message is displayed.
   * @param user - The user's name.
   * @param id - The ID of the Funko to delete.
   */
  public deleteFunko(user: string, id: number) {
    let funkoExists = false;
    fs.access(`./funkos/${user}/${id}.json`, (error) => {
      if (!error) {
        funkoExists = true;
      }
    });
    setTimeout(() => {
      if (funkoExists) {
        fs.unlink(`./funkos/${user}/${id}.json`, () => {
          console.log(chalk.green(`Funko deleted from ${user} collection!`));
        });
      } else {
        console.log(chalk.red(`Funko not found in ${user} collection!`));
      }
    }, 100);
  }

  /**
   * Reads and displays the details of a Funko from the user's collection.
   * If the Funko does not exist, an error message is displayed.
   * @param user - The user's name.
   * @param id - The ID of the Funko to read.
   */
  public readFunko(user: string, id: number) {
    let funkoExists = false;
    fs.access(`./funkos/${user}/${id}.json`, (error) => {
      if (!error) {
        funkoExists = true;
      }
    });
    setTimeout(() => {
      if (funkoExists) {
        fs.readFile(`./funkos/${user}/${id}.json`, 'utf-8', (err, data) => {
          if (!err) {
            FunkoPrint.printFunko(JSON.parse(data));
          }
        });
      } else {
        console.log(chalk.red(`Funko not found in ${user} collection!`));
      }
    }, 100);
  }

  /**
   * Lists all Funkos in a user's collection.
   * If the user has no Funkos, an error message is displayed.
   * @param user - The user's name.
   */
  public listFunkos(user: string) {
    fs.readdir(`./funkos/${user}/`, (err, files) => {
      if (err) {
        console.log(chalk.red(`No Funkos found on ${user} collection!`));
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

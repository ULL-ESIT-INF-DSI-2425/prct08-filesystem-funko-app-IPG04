import chalk from "chalk";
import Funko from "./funko.js";

/**
 * Defines price ranges for Funkos.
 */
enum FunkoRangePrice {
  LOW = 10,
  MEDIUM = 30,
  HIGH = 50
}

/**
 * Handles the printing of Funko details in a formatted and colored manner.
 */
export default class FunkoPrint {
  private static _log = console.log;

  /**
   * Prints the details of a given Funko with appropriate formatting and colors.
   * Price is displayed in different colors based on its value.
   * @param funko - The Funko object to print.
   */
  public static printFunko(funko: Funko) {
    this._log(chalk.bold.white('Funko ID: ') + funko.id);
    this._log(chalk.bold.white('Funko Name: ') + funko.name);
    this._log(chalk.bold.white('Funko Description: ') + funko.description);
    this._log(chalk.bold.white('Funko Type: ') + funko.type);
    this._log(chalk.bold.white('Funko Genre: ') + funko.gender);
    this._log(chalk.bold.white('Funko Franchise: ') + funko.franchise);
    this._log(chalk.bold.white('Funko Number: ') + funko.number);
    this._log(chalk.bold.white('Funko Exclusive: ') + funko.exclusive);
    this._log(chalk.bold.white('Funko Special Characteristics: ') + funko.specialCharacteristics);

    // Display the price in different colors based on the price range
    switch (true) {
      case funko.price <= FunkoRangePrice.LOW:
        this._log(chalk.bold.white('Funko Price: ') + chalk.green(funko.price));
        break;
      case funko.price > FunkoRangePrice.LOW && funko.price <= FunkoRangePrice.MEDIUM:
        this._log(chalk.bold.white('Funko Price: ') + chalk.yellow(funko.price));
        break;
      case funko.price > FunkoRangePrice.MEDIUM && funko.price <= FunkoRangePrice.HIGH:
        this._log(chalk.bold.white('Funko Price: ') + chalk.magenta(funko.price));
        break;
      default:
        this._log(chalk.bold.white('Funko Price: ') + chalk.red(funko.price));
        break;
    }
  }
}

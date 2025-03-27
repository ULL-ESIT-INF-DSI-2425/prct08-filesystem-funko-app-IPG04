/**
 * Enum representing the different types of Funkos.
 */
export enum FunkoType {
  POP = 'Pop!',
  POP_RIDES = 'Pop! Rides',
  VYNIL_SODA = 'Vynil Soda',
  VYNIL_GOLD = 'Vynil Gold'
}

/**
 * Enum representing the different genres or categories of Funkos.
 */
export enum FunkoGender {
  ANIMATION = 'Animation',
  MOVIE_TV = 'Movie & TV',
  SPORT = 'Sport',
  VIDEOGAME = 'Videogame',
  MUSIC = 'Music',
  ANIME = 'Anime'
}

/**
 * Interface representing the structure of a Funko object.
 */
export default interface Funko {
  /**
   * Unique identifier for the Funko.
   */
  id: number;

  /**
   * Name of the Funko.
   */
  name: string;

  /**
   * Description of the Funko.
   */
  description: string;

  /**
   * Type of the Funko (e.g., Pop!, Pop! Rides, etc.).
   */
  type: FunkoType;

  /**
   * Genre or category of the Funko (e.g., Animation, Movie & TV, etc.).
   */
  gender: FunkoGender;

  /**
   * Franchise to which the Funko belongs (e.g., Marvel, Star Wars, etc.).
   */
  franchise: string;

  /**
   * Unique number within the Funko franchise.
   */
  number: number;

  /**
   * Indicates whether the Funko is an exclusive edition.
   */
  exclusive: boolean;

  /**
   * Special characteristics of the Funko (e.g., glow-in-the-dark, metallic finish).
   */
  specialCharacteristics: string;

  /**
   * Price of the Funko.
   */
  price: number;
}

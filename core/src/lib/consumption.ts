/**
 * Stores consumption data ready to be displayed to the user.
 */
export class Consumption {
  constructor(datetime: Date, cost: number = 0) {
    this.datetime = datetime;
    this.cost = cost;
  }

  /**
   * Reference point of the consumption data.
   */
  public datetime: Date;

  /**
   * Cost of the consumption.
   */
  public cost: number;
}

/**
 * Stores energy meter measurement, registered by the user.
 */
export class Measurement {
  constructor(datetime: Date, value: number = 0) {
    this.datetime = datetime;
    this.value = value;
  }

  /**
   * Point in time when the energy measurement was taken.
   */
  public datetime: Date;

  /**
   * Value shown on the meter.
   */
  public value: number;
}

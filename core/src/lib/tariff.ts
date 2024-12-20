/**
 * Store energy tariff information, to be use in calalculations.
 */
export class Tariff {
  /**
   * Sets values to what was provides, or to the default values.
   */
  constructor(fixedCharge: number = 0.4636274, unitCharge: number = 0.178957) {
    this.fixedCharge = fixedCharge;
    this.unitCharge = unitCharge;
  }

  /**
   * Fixed part of the energy bill—line maintainece, contracted power, etc.
   * Counted per day.
   */
  public fixedCharge: number;

  /**
   * Price per unit of energy consume (usualy kWh).
   */
  public unitCharge: number;
}

import { Injectable } from '@angular/core';

import { Tariff } from 'core';

/**
 * Service that takes care setting & reading Tariff values.
 */
@Injectable({
  providedIn: 'root',
})
export class TariffService {
  constructor() {}

  /**
   * Reads tariff value form the local storage.
   */
  getValue(): Tariff {
    return new Tariff();
  }

  /**
   * Sets tariff value to local storage.
   */
  setValue(tariff: Tariff) {}
}

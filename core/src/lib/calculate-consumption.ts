import { addHours, compareAsc, differenceInHours, startOfHour } from "date-fns";
import { range } from "lodash";

import { Consumption } from "./consumption";
import { Measurement } from "./measurement";
import { Tariff } from "./tariff";
import { findAfterMeasurement } from "./find-after-measurement";
import { findBeforeMeasurement } from "./find-before-measurement";
import { interpolateValue } from "./interpolate-value";

/**
 * Method that calculates hourly consumption for a given measurements.
 */
export function calculateConsumption(
  tariff: Tariff,
  measurements: Measurement[]
): Consumption[] {
  if (measurements && measurements.length > 1) {
    const orderedMeasurments = measurements.sort((a, b) =>
        compareAsc(a.datetime, b.datetime)
      ),
      hourlyFixedCharge = tariff.fixedCharge / 24;

    const firstHour = startOfHour(orderedMeasurments[0].datetime),
      lastHour = startOfHour(orderedMeasurments.at(-1).datetime);

    const consumptionArraySize = differenceInHours(lastHour, firstHour) + 1;

    let currentConsumption: number,
      currentHour: Date,
      nextHour: Date = firstHour,
      startMeasurement: Measurement,
      endMeasurement: Measurement,
      nextConsumption: number = orderedMeasurments[0].value;

    const consumptionArray = range(0, consumptionArraySize).map((n) => {
      currentConsumption = nextConsumption;
      currentHour = nextHour;

      nextHour = addHours(firstHour, n + 1);
      startMeasurement = findBeforeMeasurement(nextHour, orderedMeasurments);
      endMeasurement = findAfterMeasurement(nextHour, orderedMeasurments);
      nextConsumption = interpolateValue(
        nextHour,
        startMeasurement,
        endMeasurement
      );

      return new Consumption(
        currentHour,
        hourlyFixedCharge +
          tariff.unitCharge * (nextConsumption - currentConsumption)
      );
    });

    return consumptionArray;
  }

  return [];
}

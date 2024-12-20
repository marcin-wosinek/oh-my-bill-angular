import { Measurement } from "./measurement";

import { compareAsc, isAfter, isDate } from "date-fns";

/**
 * Method that returns the first relevant measurement after the time.
 */
export function findAfterMeasurement(
  time: Date,
  measurements: Measurement[]
): Measurement {
  if (!isDate(time) || !measurements || measurements.length < 1) {
    return;
  }

  const afterMeasurements = measurements.filter((measurement) =>
    isAfter(measurement.datetime, time)
  );

  afterMeasurements.sort((a, b) => compareAsc(a.datetime, b.datetime));

  return afterMeasurements[0];
}

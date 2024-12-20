import { Measurement } from "./measurement";

import { compareDesc, isBefore, isDate } from "date-fns";

/**
 * Method that returns the last relevant measurement before the time.
 */
export function findBeforeMeasurement(
  time: Date,
  measurements: Measurement[]
): Measurement {
  if (!isDate(time) || !measurements || measurements.length < 1) {
    return;
  }

  const beforeMeasurement = measurements.filter((measurement) =>
    isBefore(measurement.datetime, time)
  );

  beforeMeasurement.sort((a, b) => compareDesc(a.datetime, b.datetime));

  return beforeMeasurement[0];
}

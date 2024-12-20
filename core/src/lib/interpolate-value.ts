import { Measurement } from './measurement';

import { isDate, differenceInSeconds } from 'date-fns';

/**
 * Method that takes two measurements, and interpolate the value at another
 * time.
 */
export function interpolateValue(
  time: Date,
  startMeasurement?: Measurement,
  endMeasurement?: Measurement
): number {
  if (!isDate(time) || (!startMeasurement && !endMeasurement)) {
    return 0;
  }

  if (!startMeasurement) {
    // @ts-ignore
    return endMeasurement.value;
  }

  if (!endMeasurement) {
    // @ts-ignore
    return startMeasurement.value;
  }

  const valueDifference = endMeasurement.value - startMeasurement.value,
    measurementTimeDifference = differenceInSeconds(
      endMeasurement.datetime,
      startMeasurement.datetime
    ),
    timeDifference = differenceInSeconds(time, startMeasurement.datetime);

  return (
    (valueDifference * timeDifference) / measurementTimeDifference +
    startMeasurement.value
  );
}

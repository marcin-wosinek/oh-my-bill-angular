import { findAfterMeasurement } from "./find-after-measurement";

import { Measurement } from "./measurement";

import { parseISO } from "date-fns";

describe("findAfterMeasurement", () => {
  test("should return undefined if empty array or time is missing", () => {
    expect(findAfterMeasurement()).toBeUndefined();
    expect(
      findAfterMeasurement(parseISO("2024-12-19T12:30:00"), [])
    ).toBeUndefined();
  });

  test("should return undefined if only have measurements before", () => {
    expect(
      findAfterMeasurement(parseISO("2024-12-19T12:30:00"), [
        new Measurement(parseISO("2024-12-19T10:00:00")),
      ])
    ).toBeUndefined();
  });

  test("should return measurement if has one after", () => {
    const afterMeasurement = new Measurement(parseISO("2024-12-19T14:00:00"));
    expect(
      findAfterMeasurement(parseISO("2024-12-19T12:30:00"), [afterMeasurement])
    ).toBe(afterMeasurement);
  });

  test("should return earliest measurement after", () => {
    const afterMeasurement = new Measurement(parseISO("2024-12-19T14:00:00"));

    expect(
      findAfterMeasurement(parseISO("2024-12-19T12:30:00"), [
        new Measurement(parseISO("2024-12-19T10:00:00")),
        new Measurement(parseISO("2024-12-19T15:00:00")),
        afterMeasurement,
      ])
    ).toBe(afterMeasurement);
  });
});

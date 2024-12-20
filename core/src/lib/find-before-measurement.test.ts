import { findBeforeMeasurement } from "./find-before-measurement";

import { Measurement } from "./measurement";

import { parseISO } from "date-fns";

describe("findBeforeMeasurement", () => {
  test("should return undefined if empty array or time is missing", () => {
    expect(findBeforeMeasurement()).toBeUndefined();
    expect(
      findBeforeMeasurement(parseISO("2024-12-19T12:30:00"), [])
    ).toBeUndefined();
  });

  test("should return undefined if only have measurements after", () => {
    expect(
      findBeforeMeasurement(parseISO("2024-12-19T12:30:00"), [
        new Measurement(parseISO("2024-12-19T15:00:00")),
      ])
    ).toBeUndefined();
  });

  test("should return measurement if has one before", () => {
    const beforeMeasurement = new Measurement(parseISO("2024-12-19T10:00:00"));
    expect(
      findBeforeMeasurement(parseISO("2024-12-19T12:30:00"), [
        beforeMeasurement,
      ])
    ).toBe(beforeMeasurement);
  });

  test("should return earliest measurement after", () => {
    const beforeMeasurement = new Measurement(parseISO("2024-12-19T12:00:00"));

    expect(
      findBeforeMeasurement(parseISO("2024-12-19T12:30:00"), [
        new Measurement(parseISO("2024-12-19T10:00:00")),
        new Measurement(parseISO("2024-12-19T15:00:00")),
        beforeMeasurement,
      ])
    ).toBe(beforeMeasurement);
  });
});

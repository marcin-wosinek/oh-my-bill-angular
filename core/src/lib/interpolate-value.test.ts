import { interpolateValue } from "./interpolate-value";

import { Measurement } from "./measurement";

import { parseISO } from "date-fns";

describe("interpolateValue", () => {
  test("should return 0 when both measurements are missing", () => {
    expect(interpolateValue()).toBe(0);
    expect(interpolateValue(parseISO("2024-12-18T17:30:00"))).toBe(0);
  });

  test("should return value if only one measurement is valid", () => {
    expect(
      interpolateValue(
        parseISO("2024-12-18T17:30:00"),
        null,
        new Measurement(parseISO("2024-12-18T18:00:00"), 2)
      )
    ).toBe(2);

    expect(
      interpolateValue(
        parseISO("2024-12-18T17:30:00"),
        new Measurement(parseISO("2024-12-18T18:00:00"), 52)
      )
    ).toBe(52);
  });

  test("should return value if both measurement are the same", () => {
    expect(
      interpolateValue(
        parseISO("2024-12-18T17:30:00"),
        new Measurement(parseISO("2024-12-18T17:00:00"), 2),
        new Measurement(parseISO("2024-12-18T18:00:00"), 2)
      )
    ).toBe(2);
  });

  test("should return average when both measurement are same distance", () => {
    expect(
      interpolateValue(
        parseISO("2024-12-18T17:30:00"),
        new Measurement(parseISO("2024-12-18T17:00:00"), 0),
        new Measurement(parseISO("2024-12-18T18:00:00"), 10)
      )
    ).toBe(5);
  });

  test("should count proportion", () => {
    expect(
      interpolateValue(
        parseISO("2024-12-18T17:15:00"),
        new Measurement(parseISO("2024-12-18T17:00:00"), 0),
        new Measurement(parseISO("2024-12-18T18:00:00"), 40)
      )
    ).toBe(10);
  });

  test("should extrapolate", () => {
    expect(
      interpolateValue(
        parseISO("2024-12-18T19:00:00"),
        new Measurement(parseISO("2024-12-18T17:00:00"), 20),
        new Measurement(parseISO("2024-12-18T18:00:00"), 40)
      )
    ).toBe(60);
  });
});

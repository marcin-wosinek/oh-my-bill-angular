import { calculateConsumption } from "./calculate-consumption";

import { Measurement } from "./measurement";
import { Tariff } from "./tariff";

import { endOfHour, parseISO } from "date-fns";

describe("calculateConsumption", () => {
  test("should return empty array", () => {
    expect(calculateConsumption()).toHaveLength(0);

    const tariff = new Tariff();

    // missing measurements
    expect(calculateConsumption(tariff)).toHaveLength(0);

    // only one measurements
    expect(
      calculateConsumption(tariff, [new Measurement(new Date(), 5)])
    ).toHaveLength(0);
  });

  test("should return one empty cost for 2 expect measurements & no flat charge", () => {
    const tariff = new Tariff(0, 1),
      startTime = parseISO("2024-12-18T16:00:00"),
      endTime = endOfHour(startTime);

    const result = calculateConsumption(tariff, [
      new Measurement(startTime, 5),
      new Measurement(endTime, 5),
    ]);

    expect(result).toHaveLength(1);
    expect(result[0].datetime).toStrictEqual(startTime);
    expect(result[0].cost).toBe(0);
  });

  test("should return four empty cost for 2 expect measurements & no flat charge", () => {
    const tariff = new Tariff(0, 1),
      startTime = parseISO("2024-12-18T16:00:00"),
      endTime = parseISO("2024-12-18T18:00:00");

    const result = calculateConsumption(tariff, [
      new Measurement(startTime, 5),
      new Measurement(endTime, 5),
    ]);

    expect(result).toHaveLength(3);
    expect(result[0].datetime).toStrictEqual(startTime);
    expect(result[0].cost).toBe(0);
    expect(result[1].datetime).toStrictEqual(parseISO("2024-12-18T17:00:00"));
    expect(result[1].cost).toBe(0);
    expect(result[2].datetime).toStrictEqual(parseISO("2024-12-18T18:00:00"));
    expect(result[2].cost).toBe(0);
  });

  test("should return one empty cost for 2 expect measurements & flat charge of 24 per day", () => {
    const tariff = new Tariff(24, 1),
      startTime = parseISO("2024-12-18T16:00:00"),
      endTime = endOfHour(startTime);

    const result = calculateConsumption(tariff, [
      new Measurement(startTime, 5),
      new Measurement(endTime, 5),
    ]);

    expect(result).toHaveLength(1);
    expect(result[0].datetime).toStrictEqual(startTime);
    expect(result[0].cost).toBe(1);
  });

  test("should return four empty cost for 2 expect measurements & fixed charge of 1 per hour", () => {
    const tariff = new Tariff(24, 1),
      startTime = parseISO("2024-12-18T16:00:00"),
      endTime = parseISO("2024-12-18T18:00:00");

    const result = calculateConsumption(tariff, [
      new Measurement(startTime, 5),
      new Measurement(endTime, 5),
    ]);

    expect(result).toHaveLength(3);
    expect(result[0].datetime).toStrictEqual(startTime);
    expect(result[0].cost).toBe(1);
    expect(result[1].datetime).toStrictEqual(parseISO("2024-12-18T17:00:00"));
    expect(result[1].cost).toBe(1);
    expect(result[2].datetime).toStrictEqual(parseISO("2024-12-18T18:00:00"));
    expect(result[2].cost).toBe(1);
  });

  test.only("should calculate cost for 2 measurement at start and end of an hour", () => {
    const tariff = new Tariff(24, 1),
      startTime = parseISO("2024-12-18T16:00:00"),
      endTime = endOfHour(startTime);

    const result = calculateConsumption(tariff, [
      new Measurement(startTime, 5),
      new Measurement(endTime, 6),
    ]);

    expect(result).toHaveLength(1);
    expect(result[0].datetime).toStrictEqual(startTime);
    expect(result[0].cost).toBe(2);
  });

  test("should calculate cost for 2 measurement at start and end of an hour—when provided in reverse order", () => {
    const tariff = new Tariff(24, 1),
      startTime = parseISO("2024-12-18T16:00:00"),
      endTime = endOfHour(startTime);

    const result = calculateConsumption(tariff, [
      new Measurement(endTime, 6),
      new Measurement(startTime, 5),
    ]);

    expect(result).toHaveLength(1);
    expect(result[0].datetime).toBe(startTime);
    expect(result[0].cost).toBe(2);
  });

  test("should spread 2 measurement difference across partial hours", () => {
    const tariff = new Tariff(24, 1);

    const result = calculateConsumption(tariff, [
      new Measurement(parseISO("2024-12-18T15:30:00"), 5),
      new Measurement(parseISO("2024-12-18T16:45:00"), 10),
    ]);

    expect(result).toHaveLength(2);
    expect(result[0].datetime).toStrictEqual(parseISO("2024-12-18T15:00:00"));
    expect(result[0].cost).toBe(3);
    expect(result[1].datetime).toStrictEqual(parseISO("2024-12-18T16:00:00"));
    expect(result[1].cost).toBe(4);
  });

  test("should combine many measurements", () => {
    const result = calculateConsumption(tariff, [
      new Measurement(parseISO("2024-12-18T15:00:00"), 2),
      new Measurement(parseISO("2024-12-18T15:30:00"), 5),
      new Measurement(parseISO("2024-12-18T16:45:00"), 10),
      new Measurement(parseISO("2024-12-18T16:59:00"), 12),
    ]);

    expect(result).toHaveLength(1);
    expect(result[0].datetime).toStrictEqual(parseISO("2024-12-18T15:00:00"));
    expect(result[0].cost).toBe(12);
  });
});

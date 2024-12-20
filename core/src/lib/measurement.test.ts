import { Measurement } from "./measurement";

describe("Measurement", () => {
  test("should be an a constructor and provide one default value", () => {
    const now = new Date();

    let measurement = new Measurement(now);

    expect(measurement).toBeInstanceOf(Measurement);
    expect(measurement.datetime).toBe(now);
    expect(measurement.value).toBe(0);

    measurement = new Measurement(now, 5);
    expect(measurement.value).toBe(5);
  });
});

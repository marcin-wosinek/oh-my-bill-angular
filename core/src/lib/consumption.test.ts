import { Consumption } from "./consumption";

describe("Consumption", () => {
  test("should be an a constructor and provide one default value", () => {
    const now = new Date();

    let consumption = new Consumption(now);

    expect(consumption).toBeInstanceOf(Consumption);
    expect(consumption.datetime).toBe(now);
    expect(consumption.cost).toBe(0);

    consumption = new Consumption(now, 5);
    expect(consumption.cost).toBe(5);
  });
});

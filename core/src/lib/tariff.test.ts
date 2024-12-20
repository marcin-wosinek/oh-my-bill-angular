import { Tariff } from "./tariff";

describe("Tariff", () => {
  test("should be an a constructor with default value", () => {
    const tariff = new Tariff();

    expect(tariff).toBeInstanceOf(Tariff);
    expect(tariff.fixedCharge).toBe(0.4636274);
    expect(tariff.unitCharge).toBe(0.178957);
  });

  test("should pass provided valeus", () => {
    const tariff = new Tariff(3, 5);

    expect(tariff.fixedCharge).toBe(3);
    expect(tariff.unitCharge).toBe(5);
  });
});

/* global expect jest */
import testyMctesterson from "../index.js";

jest.mock("../index.scss", () => "style");
describe("example test", () => {
  it("adds 3 to a number", () => {
    expect(testyMctesterson(3)).toBe(6);
  });
});

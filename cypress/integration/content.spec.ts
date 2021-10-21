/// <reference types="cypress" />

import { normalisePath } from "../../src/modules/content";

describe("Unit test content functions", () => {
  context("normalisePath", () => {
    describe("when valid", () => {
      it("should normalise path as expected", () => {
        expect(normalisePath("/foo/bar")).equals("/foo/bar");
        expect(normalisePath("/foo/bar/")).equals("/foo/bar");
        expect(normalisePath("////foo////bar////")).equals("/foo/bar");
        expect(normalisePath("/foo/bar/?foo=bar")).equals("/foo/bar");
        expect(normalisePath("/foo/bar?foo=bar")).equals("/foo/bar");
      });
    });
    describe("when invalid", () => {
      it("should return root path /", () => {
        expect(normalisePath()).equals("/");
        expect(normalisePath(null)).equals("/");
        expect(normalisePath([])).equals("/");
        expect(normalisePath({})).equals("/");
        expect(normalisePath(123)).equals("/");
      });
    });
  });
});

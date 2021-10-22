/// <reference types="cypress" />

/* eslint-disable no-unused-expressions */
/* eslint-disable jest/valid-expect */

import {
  getMeta,
  getPagePaths,
  normalisePath,
  getPageForPath,
} from "../../src/modules/content";

describe("Unit test content functions", () => {
  describe("normalisePath", () => {
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

  describe("getMeta", () => {
    it("should return meta data", () => {
      const meta = getMeta();
      expect(meta).to.have.property("titles");
      expect(meta).to.have.property("work");
      expect(meta).to.have.nested.property("work.pages");
    });
  });

  describe("getPagePaths", () => {
    it("should return an array of page paths", () => {
      const pagePaths = getPagePaths();
      expect(pagePaths).to.be.an("array").that.is.not.empty;
    });
  });

  describe("getPageForPath", () => {
    describe("when valid", () => {
      it("should return a page object", () => {
        const page = getPageForPath("/");
        expect(page).to.have.property("path").that.equals("/");
        expect(page).to.have.property("title");
        expect(page).to.have.property("description");
        expect(page).to.have.property("components").that.is.an("array");
      });
    });
    describe("when invalid", () => {
      it("should return undefined", () => {
        const page = getPageForPath("/foo/bar/123");
        expect(page).to.be.undefined;
      });
    });
  });
});

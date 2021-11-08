/// <reference types="cypress" />

/* eslint-disable no-unused-expressions */
/* eslint-disable jest/valid-expect */

import {
  getMeta,
  getWorkPagePaths,
  getPagePaths,
  normalisePath,
  getPageForPath,
  getNextWorkPageForPath,
  getComponentsForPath,
} from "../../src/modules/content";

import contentFixture from "../fixtures/content/content.json";

describe("Unit test content functions", () => {
  describe("normalisePath", () => {
    describe("when valid", () => {
      describe("when given a string", () => {
        it("should normalise path as expected", () => {
          expect(normalisePath("/foo/bar")).equals("/foo/bar");
          expect(normalisePath("/foo/bar/")).equals("/foo/bar");
          expect(normalisePath("////foo////bar////")).equals("/foo/bar");
          expect(normalisePath("/foo/bar/?foo=bar")).equals("/foo/bar");
          expect(normalisePath("/foo/bar?foo=bar")).equals("/foo/bar");
        });
      });
      describe("when given an array", () => {
        it("should normalise path as expected", () => {
          expect(normalisePath(["foo", "bar"])).equals("/foo/bar");
          expect(normalisePath(["/foo", "/bar"])).equals("/foo/bar");
          expect(normalisePath(["/foo/", "/bar/"])).equals("/foo/bar");
          expect(normalisePath(["foo/", "bar/"])).equals("/foo/bar");
          expect(normalisePath(["foo", "bar", "?foo=bar"])).equals("/foo/bar");
        });
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

  describe("getNextWorkPageForPath", () => {
    describe("when valid", () => {
      const workPagePaths = getWorkPagePaths();
      describe("when given the first work page", () => {
        it("should return the next work page", () => {
          const nextWorkPageForPath = getNextWorkPageForPath(workPagePaths[0]);
          expect(nextWorkPageForPath)
            .to.have.property("path")
            .that.equals(workPagePaths[1]);
        });
      });
      describe("when given the last work page", () => {
        it("should return the first work page", () => {
          const nextWorkPageForPath = getNextWorkPageForPath(
            workPagePaths[workPagePaths.length - 1]
          );
          expect(nextWorkPageForPath)
            .to.have.property("path")
            .that.equals(workPagePaths[0]);
        });
      });
    });
    describe("when invalid", () => {
      it("should return undefined", () => {
        const page = getNextWorkPageForPath("/foo/bar/123");
        expect(page).to.be.undefined;
      });
    });
  });

  describe("getComponentsForPath", () => {
    describe("when valid", () => {
      it("should return the page components with before and after", () => {
        const components = getComponentsForPath("/", contentFixture);
        expect(components.map((component) => component.type)).to.eql([
          "before-fixture",
          "first-root-fixture",
          "second-root-fixture",
          "after-fixture",
        ]);
      });
      it("should exclude before components with matching path", () => {
        const components = getComponentsForPath(
          "/before-exclude",
          contentFixture
        );
        expect(components.map((component) => component.type)).to.eql([
          "first-before-exclude-fixture",
          "second-before-exclude-fixture",
          "after-fixture",
        ]);
      });
      it("should exclude after components with matching path", () => {
        const components = getComponentsForPath(
          "/after-exclude",
          contentFixture
        );
        expect(components.map((component) => component.type)).to.eql([
          "before-fixture",
          "first-after-exclude-fixture",
          "second-after-exclude-fixture",
        ]);
      });
    });
    describe("when invalid", () => {
      it("should return before and after", () => {
        const components = getComponentsForPath("/foo/bar/123", contentFixture);
        expect(components.map((component) => component.type)).to.eql([
          "before-fixture",
          "after-fixture",
        ]);
      });
    });
  });
});
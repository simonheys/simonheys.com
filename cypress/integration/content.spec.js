/// <reference types="cypress" />

/* eslint-disable no-unused-expressions */
/* eslint-disable jest/valid-expect */

import {
  getMeta,
  getPortfolioPagePaths,
  getPagePaths,
  normalisePath,
  getPageForPath,
  getNextPortfolioPageForPath,
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
      expect(meta).to.have.property("portfolio");
      expect(meta).to.have.nested.property("portfolio.pages");
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

  describe("getNextPortfolioPageForPath", () => {
    describe("when valid", () => {
      const portfolioPagePaths = getPortfolioPagePaths();
      describe("when given the first portfolio page", () => {
        it("should return the next portfolio page", () => {
          const nextPortfolioPageForPath = getNextPortfolioPageForPath(
            portfolioPagePaths[0]
          );
          expect(nextPortfolioPageForPath)
            .to.have.property("path")
            .that.equals(portfolioPagePaths[1]);
        });
      });
      describe("when given the last portfolio page", () => {
        it("should return the first portfolio page", () => {
          const nextPortfolioPageForPath = getNextPortfolioPageForPath(
            portfolioPagePaths[portfolioPagePaths.length - 1]
          );
          expect(nextPortfolioPageForPath)
            .to.have.property("path")
            .that.equals(portfolioPagePaths[0]);
        });
      });
    });
    describe("when invalid", () => {
      it("should return undefined", () => {
        const page = getNextPortfolioPageForPath("/foo/bar/123");
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

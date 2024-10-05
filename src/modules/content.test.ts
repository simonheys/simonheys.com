import contentFixtureJson from "./__fixtures__/content/content.json";
import {
  Content,
  getComponentsForPath,
  getMeta,
  getNextPortfolioPageForPath,
  getPageForPath,
  getPagePaths,
  getPortfolioPagePaths,
  normalisePath,
} from "./content";

const contentFixture = contentFixtureJson as unknown as Content;

describe("Unit test content functions", () => {
  describe("normalisePath", () => {
    describe("when valid", () => {
      describe("when given a string", () => {
        test("should normalise path as expected", async () => {
          expect(normalisePath("/foo/bar")).toEqual("/foo/bar");
          expect(normalisePath("/foo/bar/")).toEqual("/foo/bar");
          expect(normalisePath("////foo////bar////")).toEqual("/foo/bar");
          expect(normalisePath("/foo/bar/?foo=bar")).toEqual("/foo/bar");
          expect(normalisePath("/foo/bar?foo=bar")).toEqual("/foo/bar");
        });
      });
      describe("when given an array", () => {
        test("should normalise path as expected", async () => {
          expect(normalisePath(["foo", "bar"])).toEqual("/foo/bar");
          expect(normalisePath(["/foo", "/bar"])).toEqual("/foo/bar");
          expect(normalisePath(["/foo/", "/bar/"])).toEqual("/foo/bar");
          expect(normalisePath(["foo/", "bar/"])).toEqual("/foo/bar");
          expect(normalisePath(["foo", "bar", "?foo=bar"])).toEqual("/foo/bar");
        });
      });
    });
    describe("when invalid", () => {
      test("should return root path /", async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        expect(normalisePath()).toEqual("/");
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        expect(normalisePath(null)).toEqual("/");
        expect(normalisePath([])).toEqual("/");
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        expect(normalisePath({})).toEqual("/");
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        expect(normalisePath(123)).toEqual("/");
      });
    });
  });
  describe("getMeta", () => {
    test("should return meta data", async () => {
      const meta = getMeta();
      expect(meta).toHaveProperty("titles");
      expect(meta).toHaveProperty("portfolio");
      expect(meta).toHaveProperty("portfolio.pages");
    });
  });
  describe("getPagePaths", () => {
    test("should return an array of page paths", async () => {
      const pagePaths = getPagePaths();
      expect(pagePaths).not.toHaveLength(0);
    });
  });
  describe("getPageForPath", () => {
    describe("when valid", () => {
      test("should return a page object", async () => {
        const page = getPageForPath("/");
        expect(page).toHaveProperty("path", "/");
        expect(page).toHaveProperty("title");
        expect(page).toHaveProperty("description");
      });
    });
    describe("when invalid", () => {
      test("should return undefined", async () => {
        const page = getPageForPath("/foo/bar/123");
        expect(page).toBeUndefined();
      });
    });
  });
  describe("getNextPortfolioPageForPath", () => {
    describe("when valid", () => {
      const portfolioPagePaths = getPortfolioPagePaths();
      describe("when given the first portfolio page", () => {
        test("should return the next portfolio page", async () => {
          const nextPortfolioPageForPath = getNextPortfolioPageForPath(
            portfolioPagePaths[0],
          );
          expect(nextPortfolioPageForPath).toHaveProperty(
            "path",
            portfolioPagePaths[1],
          );
        });
      });
      describe("when given the last portfolio page", () => {
        test("should return the first portfolio page", async () => {
          const nextPortfolioPageForPath = getNextPortfolioPageForPath(
            portfolioPagePaths[portfolioPagePaths.length - 1],
          );
          expect(nextPortfolioPageForPath).toHaveProperty(
            "path",
            portfolioPagePaths[0],
          );
        });
      });
    });
    describe("when invalid", () => {
      test("should return undefined", async () => {
        const page = getNextPortfolioPageForPath("/foo/bar/123");
        expect(page).toBeUndefined();
      });
    });
  });
  describe("getComponentsForPath", () => {
    describe("when valid", () => {
      test("should return the page components with before and after", async () => {
        const components = getComponentsForPath("/", contentFixture);
        expect(components.map((component) => component.type)).toEqual([
          "before-fixture",
          "first-root-fixture",
          "second-root-fixture",
          "after-fixture",
        ]);
      });
      test("should exclude before components with matching path", async () => {
        const components = getComponentsForPath(
          "/before-exclude",
          contentFixture,
        );
        expect(components.map((component) => component.type)).toEqual([
          "first-before-exclude-fixture",
          "second-before-exclude-fixture",
          "after-fixture",
        ]);
      });
      test("should exclude after components with matching path", async () => {
        const components = getComponentsForPath(
          "/after-exclude",
          contentFixture,
        );
        expect(components.map((component) => component.type)).toEqual([
          "before-fixture",
          "first-after-exclude-fixture",
          "second-after-exclude-fixture",
        ]);
      });
    });
    describe("when invalid", () => {
      test("should return before and after", async () => {
        const components = getComponentsForPath("/foo/bar/123", contentFixture);
        expect(components.map((component) => component.type)).toEqual([
          "before-fixture",
          "after-fixture",
        ]);
      });
    });
  });
});

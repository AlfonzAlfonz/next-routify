'use strict';
const {
  expect
} = require('chai');
const {
  router
} = require("../dist/router");
const {
  route,
  bundle
} = require("../dist/routes/route");
const {
  match
} = require("../dist/match");
const {
  getRouteFilename
} = require("../dist/flattenRoutes");

const simpleRoutes = (rootPath, rootFilename, expectedRootfilename) => {
  const name = "[root:\"" + rootPath + "\"] ";
  const p = rootPath === "" ? "" : ("/" + rootPath);
  const rootUrl = "/" + rootPath;
  const {
    routes,
    flattenRoutes
  } = router(
    bundle(
      route(rootPath, rootFilename), {
        article: route("article/:id"),
        user: route("user"),
        admin: bundle(route("admin"), {
          article: route("article/:id", "admin/article"),
          user: route("user", "admin/user")
        })
      }
    )
  );

  describe(name + 'url test of simple configuration', () => {
    it('root route', () => {
      expect(routes.url({})).to.equal(rootUrl);
    });

    it('route with parameter', () => {
      expect(routes.article.url({
        id: 5
      })).to.equal(p + "/article/5");
    });

    it('bundle route root', () => {
      expect(routes.admin.url({
        id: 5
      })).to.equal(p + "/admin");
    });

    it('bundle route with parameter', () => {
      expect(routes.admin.article.url({
        id: 5
      })).to.equal(p + "/admin/article/5");
    });
  });

  describe(name + 'match test with simple config', () => {
    const testPath = (path, expectPath, expectParams, expectFilename) => {
      const m = match(path, flattenRoutes);
      const flatten = flattenRoutes[m.path];
      expect(m.path).to.equal(expectPath);
      expect(m.params).to.deep.equal(expectParams);
      expect(getRouteFilename(flatten)).to.equal(expectFilename);
    };

    // Route root
    it('root route', () => {
      testPath(rootUrl, rootUrl, {}, expectedRootfilename);
    });
    it('root route with trailing slash', () => {
      testPath(rootUrl === "/" ? "/" : rootUrl + "", rootUrl, {}, expectedRootfilename);
    });

    // Route with parameter
    it('route with parameter', () => {
      testPath(p + "/article/5", p + "/article/:id", {
        id: "5"
      }, "/article");
    });
    it('route with parameter with trailing slash', () => {
      testPath(p + "/article/5/", p + "/article/:id", {
        id: "5"
      }, "/article");
    });

    // Bundle route root
    it('bundle route root', () => {
      testPath(p + "/admin", p + "/admin", {}, "/admin");
    });
    it('bundle route root with trailing slash', () => {
      testPath(p + "/admin/", p + "/admin", {}, "/admin");
    });

    // Bundle route with parameter
    it('bundle route with parameter', () => {
      testPath(p + "/admin/article/5", p + "/admin/article/:id", {
        id: "5"
      }, "/admin/article");
    });
    it('bundle route with parameter with trailing slash', () => {
      testPath(p + "/admin/article/5/", p + "/admin/article/:id", {
        id: "5"
      }, "/admin/article");
    });
  });
};

simpleRoutes("", undefined, "/");
simpleRoutes("app", undefined, "/app");
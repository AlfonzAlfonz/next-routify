import { expect } from "chai";
import { routes, flattenRoutes } from ".";

describe("Simple url generating", () => {
  it("root", () => {
    expect(routes().url).to.equal("/");
  });
  it("article", () => {
    expect(routes().article({ id: 5 }).url).to.equal("/article/5");
  });
  it("user", () => {
    expect(routes().user().url).to.equal("/user");
  });
  it("admin", () => {
    expect(routes().admin().url).to.equal("/admin");
  });
  it("admin/dashboard", () => {
    expect(
      routes()
        .admin()
        .dashboard().url
    ).to.equal("/admin/dashboard");
  });
  it("admin/article", () => {
    expect(
      routes()
        .admin()
        .article({ id: 5 }).url
    ).to.equal("/admin/article/5");
  });
  it("admin/user", () => {
    expect(
      routes()
        .admin()
        .user().url
    ).to.equal("/admin/user");
  });
  it("store", () => {
    expect((routes().store() as any).url).to.equal(undefined);
  });
  it("store/tshirts", () => {
    expect(
      routes()
        .store()
        .tshirts().url
    ).to.equal("/store/tshirts");
  });
  // it("category", () => {
  //   expect(routes().category({ id: 5 }).url).to.equal("/category/5");
  // });
  // it("category/user", () => {
  //   expect(
  //     routes()
  //       .category({ id: 5 })
  //       .user().url
  //   ).to.equal("/category/5/user");
  // });
  // it("category/user", () => {
  //   expect(
  //     routes()
  //       .category({ id: 5 })
  //       .article({ id: 5 }).url
  //   ).to.equal("/category/5/article/5");
  // });
});

describe("Flatten routes", () => {
  it("root", () => {
    expect(flattenRoutes["/"].filename).to.equal("/");
  });
  it("article", () => {
    expect(flattenRoutes["/article/:id"].filename).to.equal("/article");
  });
  it("user", () => {
    expect(flattenRoutes["/user"].filename).to.equal("/user");
  });
  it("admin", () => {
    expect(flattenRoutes["/admin"].filename).to.equal("/admin");
  });
  it("admin/article", () => {
    expect(flattenRoutes["/admin/article/:id"].filename).to.equal(
      "/admin/article"
    );
  });
  it("admin/user", () => {
    expect(flattenRoutes["/admin/user"].filename).to.equal("/admin/user");
  });
  it("dev", () => {
    expect(flattenRoutes["/dev/:path*"].filename).to.equal("/dev");
    expect(flattenRoutes["/dev/:path*"].options.filesystem).to.equal(true);
  });
  // it("category", () => {
  //   expect(flattenRoutes["/category/:id"]).to.equal("/category");
  // });
  // it("category/user", () => {
  //   expect(flattenRoutes["/category/:id/user"]).to.equal("/category/user");
  // });
  // it("category/user", () => {
  //   expect(flattenRoutes["/category/:id/article/:id"]).to.equal(
  //     "/category/article"
  //   );
  // });
});

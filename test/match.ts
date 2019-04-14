import { expect } from "chai";
import { match } from "../src/match";
import { flattenRoutes } from ".";

describe("Matching routes", () => {
  it("root", () => {
    const m = match("/", flattenRoutes);
    expect(m.path).to.equal("/");
    expect(m.params).to.deep.equal({});
  });
  it("article", () => {
    const m = match("/article/5", flattenRoutes);
    expect(m.path).to.equal("/article/:id");
    expect(m.params).to.deep.equal({ id: "5" });
  });
  it("article with query string", () => {
    const m = match("/article/5?id=6", flattenRoutes);
    expect(m.path).to.equal("/article/:id");
    expect(m.params).to.deep.equal({ id: "5" });
  });
  it("user", () => {
    const m = match("/user", flattenRoutes);
    expect(m.path).to.equal("/user");
    expect(m.params).to.deep.equal({});
  });
  it("admin", () => {
    const m = match("/admin", flattenRoutes);
    expect(m.path).to.equal("/admin");
    expect(m.params).to.deep.equal({});
  });
  it("admin/article", () => {
    const m = match("/admin/article/5", flattenRoutes);
    expect(m.path).to.equal("/admin/article/:id");
    expect(m.params).to.deep.equal({ id: "5" });
  });
  it("admin/user", () => {
    const m = match("/admin/user", flattenRoutes);
    expect(m.path).to.equal("/admin/user");
    expect(m.params).to.deep.equal({});
  });
  // it("category", () => {
  //   const m = match("/category/5", flattenRoutes);
  //   expect(m.path).to.equal("/category/:id");
  //   expect(m.params).to.deep.equal({ id: "5" });
  // });
  // it("category/user", () => {
  //   const m = match("/category/5/user", flattenRoutes);
  //   expect(m.path).to.equal("/category/:id/user");
  //   expect(m.params).to.deep.equal({ id: "5" });
  // });
  // it("category/user", () => {
  //   const m = match("/category/5/article/6", flattenRoutes);
  //   expect(m.path).to.equal("/category/:id/article/:id");
  //   expect(m.params).to.deep.equal({ id: "6" });
  // });
});

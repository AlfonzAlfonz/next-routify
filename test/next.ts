import { flattenRoutes } from ".";
import { expect } from "chai";
import { getHrefUrl } from "../dist";

describe("getHrefUrl function", () => {
  it("root", () => {
    expect(getHrefUrl("/", flattenRoutes)).to.equal("/");
  });
  it("article", () => {
    expect(getHrefUrl("/article/5", flattenRoutes)).to.equal("/article");
  });
  it("user", () => {
    expect(getHrefUrl("/user", flattenRoutes)).to.equal("/user");
  });
  it("admin/article", () => {
    expect(getHrefUrl("/admin/article/5", flattenRoutes)).to.equal(
      "/admin/article"
    );
  });
  it("admin/article?id=5", () => {
    expect(getHrefUrl("/admin/article/5?id=5", flattenRoutes)).to.equal(
      "/admin/article?id=5"
    );
  });
});

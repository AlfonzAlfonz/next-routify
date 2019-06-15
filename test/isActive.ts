import { expect } from "chai";
import { flattenRoutes, routes } from ".";
import { routifyBuilder } from "../dist";

const { isUrlActive } = routifyBuilder(flattenRoutes);

describe("Is url active", () => {
  // Basic use
  it("is active", () => {
    expect(
      isUrlActive(
        routes()
          .admin()
          .user(),
        routes().admin()
      )
    ).to.equal(true);
  });
  it("is not active", () => {
    expect(isUrlActive(routes().article({ id: 5 }), routes().admin())).to.equal(
      false
    );
  });

  // Use with params
  it("is active with id", () => {
    expect(
      isUrlActive(
        routes()
          .admin()
          .article({ id: 5 }),
        routes().admin()
      )
    ).to.equal(true);
  });
  it("is not active with id", () => {
    expect(isUrlActive(routes().article({ id: 5 }), routes().admin())).to.equal(
      false
    );
  });

  // Any url
  it("subject is not any route", () => {
    expect(
      isUrlActive("/route/that/does/not/exist", routes().admin())
    ).to.equal(false);
  });

  // Use with query
  it("is active with query", () => {
    expect(
      isUrlActive(
        routes()
          .admin()
          .user().url + "?search=John",
        routes().admin()
      )
    ).to.equal(true);
  });
  it("is not active with query", () => {
    expect(
      isUrlActive(
        routes().article({ id: 5 }).url + "?search=John",
        routes().admin()
      )
    ).to.equal(false);
  });

  // Basic use with strict checking
  it("is active (strict)", () => {
    expect(isUrlActive(routes().admin(), routes().admin(), true)).to.equal(
      true
    );
  });
  it("is not active (strict)", () => {
    expect(
      isUrlActive(
        routes()
          .admin()
          .user(),
        routes().admin(),
        true
      )
    ).to.equal(false);
  });

  // Use with id and strict checking
  it("is active with id (strict)", () => {
    expect(
      isUrlActive(
        routes().article({ id: 5 }),
        routes().article({ id: 5 }),
        true
      )
    ).to.equal(true);
  });
  it("is not active with id (strict)", () => {
    expect(
      isUrlActive(
        routes().article({ id: 5 }),
        routes()
          .admin()
          .article({ id: 5 }),
        true
      )
    ).to.equal(false);
  });

  // Use with query and strict checking
  it("is active with query (strict)", () => {
    expect(
      isUrlActive(routes().admin().url + "?search=John", routes().admin(), true)
    ).to.equal(true);
  });
  it("is not active with query (strict)", () => {
    expect(
      isUrlActive(
        routes().article({ id: 5 }).url + "?search=John",
        routes().admin(),
        true
      )
    ).to.equal(false);
  });
});

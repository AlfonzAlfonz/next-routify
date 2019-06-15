import * as React from "react";
import { RouteLink, routes } from "routes";

const Navbar: React.FC = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <span className="navbar-brand">Typed router</span>
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <RouteLink to={routes()} active="font-weight-bold" strict>
          <a className="nav-link">Home</a>
        </RouteLink>
      </li>
      <li className="nav-item">
        <RouteLink to={routes().simple()} active="font-weight-bold">
          <a className="nav-link">Simple</a>
        </RouteLink>
      </li>
    </ul>
    <div className="form-inline my-2 my-lg-0">
      <RouteLink to={routes().admin()} active="font-weight-bold">
        <a className="btn btn-light">Admin</a>
      </RouteLink>
    </div>
  </nav>
);

export default Navbar;

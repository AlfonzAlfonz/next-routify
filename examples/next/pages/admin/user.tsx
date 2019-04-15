import * as React from "react";
import { routes, RouteLink } from "routes";

const User: React.FC = () => (
  <div>
    <h2>User</h2>
    <RouteLink to={routes().admin()}>
      <a className="btn btn-primary mb-4">Back</a>
    </RouteLink>
    <table className="table">
      <tr>
        <td>
          <strong>Username</strong>
        </td>
        <td>jefffff123</td>
      </tr>
      <tr>
        <td>
          <strong>First name</strong>
        </td>
        <td>Jeff</td>
      </tr>
      <tr>
        <td>
          <strong>Last name</strong>
        </td>
        <td>Foe</td>
      </tr>
    </table>
  </div>
);

export default User;

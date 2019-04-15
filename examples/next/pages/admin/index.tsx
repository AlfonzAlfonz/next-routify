import * as React from "react";
import { RouteLink, routes } from "routes";

const Admin: React.FC = () => (
  <div>
    <h1>Fake admin interface</h1>
    <ul>
      <li>
        <RouteLink
          to={routes()
            .admin()
            .article({ id: 5 })}
        >
          <a>Article</a>
        </RouteLink>
      </li>
      <li>
        <RouteLink
          to={routes()
            .admin()
            .user()}
        >
          <a>User</a>
        </RouteLink>
      </li>
    </ul>
  </div>
);

export default Admin;

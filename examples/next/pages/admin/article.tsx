import * as React from "react";
import { RouteLink, routes } from "routes";

const Article: React.FC = () => (
  <div>
    <h2>admin/article</h2>
    <RouteLink to={routes().admin()}>
      <a className="btn btn-primary mb-4">Back</a>
    </RouteLink>
  </div>
);

export default Article;

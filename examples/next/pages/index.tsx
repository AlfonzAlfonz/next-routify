import * as React from "react";
import { ARTICLES } from "mockups/articles";
import { RouteLink, routes } from "routes";

const Index: React.FC = () => (
  <div>
    {ARTICLES.map(a => (
      <div className="card mb-4">
        <img className="card-img-top" src={a.cover} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{a.title}</h5>
          <p className="card-text">{a.text.substring(0, 200)}</p>
          <RouteLink to={routes().article({ id: a.id })}>
            <a className="btn btn-primary">Read</a>
          </RouteLink>
        </div>
      </div>
    ))}
  </div>
);

export default Index;

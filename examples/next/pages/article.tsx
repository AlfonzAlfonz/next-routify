import * as React from "react";
import { withTypedRouter, WithTypedRouter } from "../../../dist";
import { flattenRoutes, RouteLink, routes } from "routes";
import { ARTICLES } from "mockups/articles";

const Article: React.FC<WithTypedRouter<{ id: string }>> = ({ parameters }) => {
  const article = ARTICLES.find(a => a.id === parseInt(parameters.id, 10))!;

  return (
    <div>
      <RouteLink to={routes()}>
        <a className="btn btn-primary mb-4">Back</a>
      </RouteLink>
      <img className="card-img-top" src={article.cover} alt={article.title} />
      <h1>{article.title}</h1>
      <p>
        <strong>{article.author}</strong>
      </p>
      <p>{article.text}</p>
    </div>
  );
};

export default withTypedRouter(flattenRoutes)(Article);

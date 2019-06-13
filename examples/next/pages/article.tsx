import * as React from "react";
import { useRoutify } from "../../../dist";
import { flattenRoutes, routes } from "routes";
import { ARTICLES } from "mockups/articles";

const Article: React.FC = () => {
  const { params, push } = useRoutify<{ id: string }>(flattenRoutes);
  const article = ARTICLES.find(a => a.id === parseInt(params.id, 10))!;

  return (
    <div>
      {/* Use RouteLink instead, this is only for demonstration purposes */}
      <span onClick={() => push(routes())} className="btn btn-primary mb-4">
        Back
      </span>
      <img className="card-img-top" src={article.cover} alt={article.title} />
      <h1>{article.title}</h1>
      <p>
        <strong>{article.author}</strong>
      </p>
      <p>{article.text}</p>
    </div>
  );
};

export default Article;

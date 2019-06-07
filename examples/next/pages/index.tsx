import * as React from "react";
import { ARTICLES } from "mockups/articles";
import { RouteLink, routes, flattenRoutes } from "routes";
import { useRoutify } from "../../../dist";

const Index: React.FC = () => {
  const { replace, query: q } = useRoutify<{}, { q: string }>(flattenRoutes);
  const [query, setQuery] = React.useState(q.q);

  React.useEffect(() => {
    q.q !== query && replace(routes().url + (query ? "?q=" + query : ""));
  });

  return (
    <div>
      <p>
        <strong>Filter by title:</strong>{" "}
        <input value={query} onChange={e => setQuery(e.target.value)} />
      </p>
      {ARTICLES.filter(a => !q.q || a.title.includes(q.q)).map(a => (
        <div className="card mb-4" key={a.id}>
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
};

export default Index;

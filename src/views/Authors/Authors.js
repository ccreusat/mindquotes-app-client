import React from "react";
import "./Authors.css";

import { gql, useQuery } from "@apollo/client";

export const Authors = () => {
  const GET_AUTHORS = gql`
    query {
      authors {
        name
      }
    }
  `;
  const {
    data: { authors } = {},
    loading: authorsLoading,
    error: authorsError,
  } = useQuery(GET_AUTHORS);

  if (authorsLoading) return <h1>Loading...</h1>;

  return (
    <div className="authors-container">
      {authors &&
        authors.map((author) => <p className="author">{author.name}</p>)}
    </div>
  );
};

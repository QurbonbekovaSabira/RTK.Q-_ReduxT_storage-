import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleDataQuery } from "../../redux/service/todo-api";

export const SinglePage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleDataQuery(id);

  if (isLoading) return <h2>Loading...</h2>;
  return (
    <div className="container pt-[20px]">
      <div>
        <strong>{data.title}</strong>
        <p>{data.description}</p>
      </div>
    </div>
  );
};

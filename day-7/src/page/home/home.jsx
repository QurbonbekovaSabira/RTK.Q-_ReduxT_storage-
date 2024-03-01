import React from "react";
import { Card } from "../../components/card/card";
import {
  useGetTodoQuery,
  usePostTodoMutation,
} from "../../redux/service/todo-api";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export const Home = () => {
  const [page, setPage] = React.useState(1);

  const { register, reset, handleSubmit } = useForm();
  const { data, isLoading } = useGetTodoQuery(page);
  const [postTodo] = usePostTodoMutation();
  const submit = (product) => {
    postTodo(product)
      .unwrap()
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    reset();
  };
  const newArr = Array(data?.pageSize).fill(null);

  if (isLoading) return <h2>Loading...</h2>;
  return (
    <>
      <div className="container">
      <Link to={"/user"}>
        <h2 className="container mb-4 pt-5 font-serif text-2xl font-bold">
          User
        </h2>
      </Link>
        <form className="mb-[40px] pt-[25px]" onSubmit={handleSubmit(submit)}>
          <div>
            <input
              className="border border-blue-400 px-4 py-2"
              placeholder="title"
              {...register("title", { required: true })}
              type="text"
            />
          </div>
          <div>
            <input
              className="mt-4 border border-blue-400 px-4 py-2"
              placeholder="description"
              {...register("description", { required: true })}
              type="text"
            />
          </div>
          <button
            className="mt-4 border border-blue-400 bg-slate-200 p-2 text-lg font-bold text-blue-500"
            type="submit"
          >
            Send
          </button>
        </form>
        <div className="flex items-center gap-4">
          {data?.data?.map((item) => (
            <Card key={item.id} {...item} />
          ))}
        </div>
        <div className="flex items-center justify-center gap-4 pb-5 pt-4">
          {newArr?.map((_, i) => {
            let num = i + 1;
            return (
              <button
                onClick={() => setPage(num)}
                className="border border-blue-500 px-2 py-1 text-lg font-bold"
                key={num}
              >
                {num}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

import React from "react";
import { useGetUserQuery } from "../../redux/service/user-api";
import { Link } from "react-router-dom";
import { UserCard } from "../../components/user-card/user-card";
import { useForm } from "react-hook-form";
import { usePostUserMutation } from "../../redux/service/user-api";

export const UserPage = () => {
  const [page, setPage] = React.useState(1);
  const { data, isLoading } = useGetUserQuery(page);
  const newArr = Array(data?.pageSize).fill(null);
  const [postUser] = usePostUserMutation();
  const { reset, register, handleSubmit } = useForm();

  const submit = (data) => {
    postUser(data)
      .unwrap()
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    reset();
  };

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <>
      <div className="container pt-5">
        <Link to={"/"}>
          <h2 className="container mb-4 font-serif text-2xl font-bold">
            {" "}
            Home
          </h2>
        </Link>
        <form
          onSubmit={handleSubmit(submit)}
          className="mx-auto mb-5 flex max-w-[800px] flex-col  justify-center border border-blue-800 p-4"
        >
          <div className="mx-auto mb-4 w-[80%]">
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="name"
              className=" w-full border border-blue-400 px-4 py-2"
            />
          </div>
          <div className="mx-auto mt-4 w-[45%]">
            <button
              className="w-full border border-blue-400 bg-slate-200 p-2 text-lg font-bold text-blue-500"
              type="submit"
            >
              Send
            </button>
          </div>
        </form>

        <>
          <div className="flex gap-5">
            {data?.data?.map((item) => (
              <UserCard {...item} key={item.id} />
            ))}
          </div>
        </>
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

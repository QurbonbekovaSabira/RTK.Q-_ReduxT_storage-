import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  useEditTodoMutation,
  useDeleteTodoMutation,
} from "../../redux/service/todo-api";
import { useDispatch } from "react-redux";
import { add, editItem, itemDelete } from "../../redux/reducer/user-reducer";
import { loadState } from "../../config/state";

export const Card = ({ title, description, id }) => {
  const [state, setState] = React.useState(false);
  const dispatch = useDispatch();
  const { reset, register, handleSubmit } = useForm();
  const [editData] = useEditTodoMutation();
  const [deleteData] = useDeleteTodoMutation();
  const editProduct = () => {
    setState(true);
  };
  const submit = (data) => {
    dispatch(editItem({ ...data, id }));
    editData({ ...data, id })
      .unwrap()
      .then((res) => {
        setState(false), console.log(res);
      })
      .catch((error) => console.log(error));
    reset();
  };
  const deleteProduct = () => {
    dispatch(itemDelete({ id }));
    deleteData(id)
      .unwrap()
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  const saveProduct = () => {
    dispatch(add({ title, description, id }));
  };
  return (
    <div className={`mb-4 border p-5 `}>
      {!state ? (
        <>
          <Link to={`/single/${id}`}>
            <h2 className="font-sans text-2xl font-bold">{title}</h2>
          </Link>
          <p className="font-sans text-lg font-medium">{description}</p>
          <div className="mt-4 flex items-center gap-4">
            <button
              className="rounded bg-green-500 px-4 py-2 text-base text-white"
              onClick={editProduct}
            >
              edit
            </button>
            <button
              onClick={deleteProduct}
              className="rounded bg-red-500 px-4 py-2 text-base text-white"
            >
              delete
            </button>
            <button
              onClick={saveProduct}
              className={`ounded bg-purple-600 px-4 py-2 text-base text-white `}
            >
              Save
            </button>
          </div>
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit(submit)}>
            <div>
              <input
                {...register("title", { required: true })}
                className="mt-4 border border-blue-400 px-4 py-2"
                type="text"
                placeholder="title"
              />
            </div>
            <div>
              <input
                {...register("description", { required: true })}
                className="mt-4 border border-blue-400 px-4 py-2"
                type="text"
                placeholder="description"
              />
            </div>
            <button type="submit">Send</button>
          </form>
        </>
      )}
    </div>
  );
};

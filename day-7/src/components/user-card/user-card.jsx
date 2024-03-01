import React from "react";
import {
  useEditUserMutation,
  useDeleteUserMutation,
} from "../../redux/service/user-api";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { add, editItem, itemDelete } from "../../redux/reducer/user-reducer";
export const UserCard = ({ name, id }) => {
  const { reset, register, handleSubmit } = useForm();
  const [input, setInput] = React.useState(false);
  const [editUser] = useEditUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const dispatch = useDispatch();

  const submit = () => {
    dispatch(add({ name, id }));
  };

  const editData = (data) => {
    dispatch(editItem({ id, ...data }));
    editUser({ id, ...data })
      .unwrap()
      .then((res) => setInput(false))
      .catch((error) => console.log(error));
  };
  const deleteData = () => {
    dispatch(itemDelete({ id }));
    deleteUser(id)
      .unwrap()
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };
  return (
    <div className=" border p-5">
      {!input ? (
        <>
          <h2 key={id} className="mb-4 text-2xl font-semibold text-orange-600">
            {name}
          </h2>
          <div className="flex gap-4">
            <button
              onClick={() => setInput(true)}
              className="rounded bg-green-500 px-4 py-2 text-base text-white"
            >
              Edit
            </button>
            <button
              onClick={deleteData}
              className="rounded bg-red-500 px-4 py-2 text-base text-white"
            >
              Delete
            </button>
            <button
              onClick={submit}
              className={`ounded bg-purple-600 px-4 py-2 text-base text-white `}
            >
              Save
            </button>
          </div>
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit(editData)}>
            <div className="mb-4">
              <input
                className=" w-full border border-blue-400 px-4 py-2"
                type="text"
                placeholder="name"
                {...register("name", { required: true })}
              />
            </div>
            <button
              className="border border-green-500 px-4 py-2 text-lg
              text-green-500"
            >
              {" "}
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
};

import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { resetUpdateProfile, updateUser } from "../features/user/userSlice";
import { setModalOpen } from "../features/utils/utilSlice";
import Modal from "./Modal";

const UpdateProfile: React.FunctionComponent = () => {
  const { isModalOpen } = useAppSelector((state) => state.util);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<{
    name: string;
    email: string;
    age: number | null;
    introduction: string;
  }> = (data) => {
    dispatch(
      updateUser({
        name: data.name,
        age: data.age,
        introduction: data.introduction,
      })
    );
  };
  const { name, email, age, introduction } = useAppSelector(
    (state) => state.user
  );

  const { message, isLoading, isSuccess, isError } = useAppSelector(
    (state) => state.user.updateProfile
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<{
    name: string;
    email: string;
    age: number | null;
    introduction: string;
  }>({
    mode: "onChange",
    defaultValues: {
      name,
      email,
      introduction,
      age,
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile updated successfully");
      dispatch(
        setModalOpen({
          isOpen: false,
          modalType: "",
        })
      );
      dispatch(resetUpdateProfile());
    }
    if (isError) {
      toast.error(message);
    }
  }, [dispatch, isError, isSuccess, message]);
  return (
    <Modal isOpen={isModalOpen.modalType === "UPDATE_PROFILE" ? true : false}>
      <div
        id="PROFILE_UPDATE_FORM"
        className=" container  has-background-white pt-8 pb-10 px-4 py-4 has-mw-md mx-auto "
        data-path="0.1.0"
      >
        <section className="form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Name"
                  {...register("name", {
                    required: "Name is required",
                  })}
                />
                <p className="help is-danger ">
                  {errors.name && errors.name.message}
                </p>
              </div>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  disabled={true}
                  className="input"
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Age</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  placeholder="Age"
                  {...register("age")}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Introduction</label>
              <div className="control">
                <textarea
                  className="textarea"
                  placeholder="Introduction"
                  {...register("introduction")}
                ></textarea>
              </div>
            </div>
            <div className="control">
              <button
                className={`button is-primary  ${
                  isLoading ? "is-loading" : ""
                }`}
                disabled={!isDirty || !isValid}
              >
                Update
              </button>
            </div>
          </form>
        </section>
      </div>
    </Modal>
  );
};
export default UpdateProfile;

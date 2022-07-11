import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Modal from "../components/Modal";
import {
  addWorkExperience,
  resetAddWorkExperience,
} from "../features/user/userSlice";
import { setModalOpen } from "../features/utils/utilSlice";

const AddWorkExperience: React.FunctionComponent = () => {
  const { isModalOpen } = useAppSelector((state) => state.util);
  const dispatch = useAppDispatch();

  const [isCurrentJob, setCurrentJob] = useState<boolean>(false);

  const onSubmit: SubmitHandler<{
    company: string;
    job_title: string;
    job_description: string;
    start_date: string;
    end_date: string;
  }> = (data) => {
    dispatch(
      addWorkExperience({
        company: data.company,
        job_title: data.job_title,
        job_description: data.job_description,
        start_date: data.start_date,
        end_date: data.end_date,
        is_current: isCurrentJob,
      })
    );
  };
  const { message, isLoading, isError, isSuccess } = useAppSelector(
    (state) => state.user.addWorkExperience
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<{
    company: string;
    job_title: string;
    job_description: string;
    start_date: string;
    end_date: string;
    is_current: boolean;
  }>({
    mode: "onChange",
  });

  const start_date_ref = useRef({});
  start_date_ref.current = watch("start_date", "");

  useEffect(() => {
    if (isSuccess) {
      toast.success("New work experience added successfully");
      dispatch(
        setModalOpen({
          isOpen: false,
          modalType: "",
        })
      );
      dispatch(resetAddWorkExperience());
    }
    if (isError) {
      toast.error(message);
    }
  }, [isError, message, isLoading, dispatch, isSuccess]);
  return (
    <Modal
      isOpen={isModalOpen.modalType === "ADD_WORK_EXPERIENCE" ? true : false}
    >
      <div
        className=" container  has-background-white pt-8 pb-10 px-4 py-4 has-mw-md mx-auto "
        data-path="0.1.0"
      >
        <section className="form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label className="label">Company</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Company"
                  {...register("company", {
                    required: "Name is required",
                  })}
                />
                <p className="help is-danger ">
                  {errors.company && errors.company.message}
                </p>
              </div>
            </div>
            <div className="field">
              <label className="label">Job Title</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Job Title"
                  {...register("job_title")}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Message</label>
              <div className="control">
                <textarea
                  className="textarea"
                  placeholder="Job Description"
                  {...register("job_description")}
                ></textarea>
              </div>
            </div>
            <div className="field">
              <label className="label">Start Date</label>
              <div className="control">
                <input
                  className="input"
                  type="date"
                  placeholder="Start Date"
                  {...register("start_date", {
                    required: "Start date is required",
                  })}
                />
                <p className="help is-danger ">
                  {errors.start_date && errors.start_date.message}
                </p>
              </div>
              <div className="field">
                <label className="label">End Date</label>
                <div className="control">
                  <input
                    className="input"
                    type="date"
                    disabled={isCurrentJob}
                    placeholder="End Date"
                    {...register("end_date", {
                      validate: (value) => {
                        if (value < start_date_ref.current && !isCurrentJob) {
                          return "End date must be after start date";
                        }
                      },
                    })}
                  />
                  <p className="help is-danger ">
                    {errors.end_date && errors.end_date.message}
                  </p>
                </div>
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={isCurrentJob}
                    onChange={(e) => setCurrentJob(e.target.checked)}
                  />
                  Currently working here
                </label>
              </div>
            </div>
            <div className="control">
              <button
                className={`button is-primary  ${
                  isLoading ? "is-loading" : ""
                }`}
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </section>
      </div>
    </Modal>
  );
};
export default AddWorkExperience;

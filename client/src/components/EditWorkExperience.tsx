import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Modal from "../components/Modal";
import { updateWorkExperience } from "../features/user/userSlice";
import { setModalOpen } from "../features/utils/utilSlice";
const EditWorkExperience = ({ data }: any) => {
  const { isModalOpen } = useAppSelector((state) => state.util);
  const dispatch = useAppDispatch();

  const {
    id: workExperienceId,
    company,
    end_date,
    job_description,
    job_title,
    start_date,
    is_current,
  } = data;

  console.log(workExperienceId, "~~~~~>>");

  const [isCurrentJob, setCurrentJob] = useState<boolean>(is_current);

  const onSubmit: SubmitHandler<{
    company: string;
    job_title: string;
    job_description: string;
    start_date: string;
    end_date: string;
  }> = (data) => {
    console.log(data, "data");
    dispatch(
      updateWorkExperience({
        id: workExperienceId,
        company: data.company,
        job_title: data.job_title,
        job_description: data.job_description,
        start_date: data.start_date,
        end_date: data.end_date,
        is_current: isCurrentJob,
      })
    );
  };
  const { message, isLoading, isSuccess, isError } = useAppSelector(
    (state) => state.user
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
    defaultValues: {
      company,
      end_date: new Date(end_date).toISOString().split("T")[0],
      job_description,
      job_title,
      start_date: new Date(start_date).toISOString().split("T")[0],
      is_current,
    },
  });

  const start_date_ref = useRef({});
  start_date_ref.current = watch("start_date", "");

  useEffect(() => {
    if (isSuccess) {
      // toast.success("Profile updated successfully");
      dispatch(
        setModalOpen({
          isOpen: false,
          modalType: "",
        })
      );
    }
    if (isError) {
      toast.error(message);
    }
    return () => {
      // toast.success("Profile updated successfully");
    };
  }, [isError, isSuccess, message]);
  return (
    <Modal
      isOpen={
        isModalOpen.modalType === "EDIT_WORK_EXPERIENCE" + workExperienceId
          ? true
          : false
      }
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
                  placeholder="job_title"
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
                  {...register("start_date")}
                />
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
                // disabled={!isDirty || !isValid}
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
export default EditWorkExperience;

import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Modal from "../components/Modal";
import { deleteWorkExperience } from "../features/user/userSlice";
import { setModalOpen } from "../features/utils/utilSlice";

const DeleteWorkExperience = ({ workExperienceId }: { workExperienceId : string}) => {
  const { isModalOpen } = useAppSelector((state) => state.util);
  const { isLoading, isSuccess, isError, message } = useAppSelector(
    (state) => state.user.delete
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      isSuccess &&
      isModalOpen.modalType === "DELETE_WORK_EXPERIENCE" + workExperienceId
    ) {
      dispatch(
        setModalOpen({
          isOpen: false,
          modalType: "",
        })
      );
      toast.success("Deleted Successfully");
    }
    if (isError) {
      toast.error(message);
    }
  }, [dispatch, isError, isSuccess, message]);

  return (
    <Modal
      isOpen={
        isModalOpen.modalType === "DELETE_WORK_EXPERIENCE" + workExperienceId
          ? true
          : false
      }
    >
      <div
        className=" container has-text-centered  has-background-white pt-8 pb-10 px-4 py-4 has-mw-md mx-auto "
        data-path="0.1.0"
      >
        <div className="buttons has-text-centered are-medium">
          <button
            className={`button is-danger ${isLoading ? "is-loading" : ""} `}
            onClick={() => {
              dispatch(
                deleteWorkExperience({
                  id: workExperienceId,
                })
              );
            }}
          >
            Yes
          </button>
          <button
            className={`button is-primary ${isLoading ? " " : ""} `}
            onClick={() => {
              dispatch(
                setModalOpen({
                  isOpen: false,
                  modalType: "",
                })
              );
            }}
          >
            No
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default DeleteWorkExperience;

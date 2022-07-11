import { useEffect } from "react";
import {
  FaCloudUploadAlt,
  FaEdit,
  FaPlusSquare,
  FaTrashAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import AddWorkExperience from "../components/AddWorkExperience";
import DeleteWorkExperience from "../components/DeleteWorkExperience";
import EditProfile from "../components/EditProfile";
import Spinner from "../components/Spinner";
import EditWorkExperience from "../components/UpdateWorkExperience";
import UploadCompanyLogo from "../components/UploadCompanyLogo";
import UploadProfilePicture from "../components/UploadProfilePicture";
import {
  getUser,
  reset,
  resetUpdateWorkExperience,
  updateUser,
  updateWorkExperience,
} from "../features/user/userSlice";
import { setModalOpen } from "../features/utils/utilSlice";

const Dashboard = () => {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();

  const {
    name,
    profile_picture_url,
    email,
    age,
    is_public,
    introduction,
    work_experience,
    message,
    isLoading,
    isUserLoading,
    isSuccess,
    isError,
    updateWorkExperience: updateWorkExperienceState,
  } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (updateWorkExperienceState.isSuccess) {
      dispatch(resetUpdateWorkExperience());
    }
  }, [dispatch, updateWorkExperienceState.isSuccess]);

  if (isUserLoading) {
    return <Spinner />;
  }

  const WorkExperience = ({ data }: any) => {
    const {
      id,
      company,
      company_logo_url,
      end_date,
      job_description,
      job_title,
      start_date,
      is_current,
    } = data;
    return (
      <div key={id}>
        <EditWorkExperience data={data} />
        <UploadCompanyLogo workExperienceId={id} />
        <DeleteWorkExperience workExperienceId={id} />
        <div className="m-6">
          <div className="card">
            <div className="card-content">
              <div className="is-flex is-justify-content-space-between">
                <div className="is-flex">
                  <div className="is-flex is-flex-direction-column">
                    <figure className="image is-64x64">
                      <img
                        src={company_logo_url}
                        alt={company}
                        width="128"
                        height="1284"
                      />
                    </figure>
                    <button
                      className="button is-small is-link my-2"
                      onClick={() =>
                        dispatch(
                          setModalOpen({
                            isOpen: true,
                            modalType: "COMPANY_LOGO_PICTURE_UPLOAD" + id,
                          })
                        )
                      }
                    >
                      <span className="icon ">
                        <FaCloudUploadAlt />
                      </span>
                      <span>Upload Image</span>
                    </button>
                  </div>
                  <div>
                    <h3 className="title is-size-5 " style={{ color: "black" }}>
                      {company}
                    </h3>
                    <p
                      className="subtitle is-size-6"
                      style={{ textAlign: "left", color: "black" }}
                    >
                      {job_title}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="is-flex is-flex-direction-column">
                    <button
                      className="button is-link"
                      onClick={() =>
                        dispatch(
                          setModalOpen({
                            isOpen: true,
                            modalType: "EDIT_WORK_EXPERIENCE" + id,
                          })
                        )
                      }
                    >
                      <span className="icon is-small">
                        <FaEdit />
                      </span>
                    </button>
                    <div className="my-2 tooltip">
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={data.is_public}
                          onChange={(e) => {
                            dispatch(
                              updateWorkExperience({
                                id: data.id,
                                is_public: e.target.checked,
                              })
                            );
                            dispatch(reset());
                          }}
                        />
                        <span className="slider"></span>
                      </label>
                      <span className="tooltip-text">
                        Show this work experience to your public profile
                      </span>
                    </div>
                    <button
                      className="button is-danger"
                      onClick={() =>
                        dispatch(
                          setModalOpen({
                            isOpen: true,
                            modalType: "DELETE_WORK_EXPERIENCE" + id,
                          })
                        )
                      }
                    >
                      <span className="icon is-small">
                        <FaTrashAlt />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="">
                <p className="is-size-6">{job_description}</p>
                <div className="is-flex mb-2 is-align-items-center">
                  <span className="is-size-6" data-config-id="value1-3">
                    <strong>Start Date: </strong>{" "}
                    {new Date(start_date).toDateString()}
                  </span>
                </div>
                <div className="is-flex mb-2 is-align-items-center">
                  <span className="is-size-6" data-config-id="value1-2">
                    <strong>ENd Date: </strong>
                    {is_current
                      ? "Currently working here."
                      : new Date(end_date).toDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ProfileContent = () => {
    return (
      <>
        <AddWorkExperience />
        <UploadProfilePicture />
        <EditProfile />

        <div className="hero-body">
          <div className="is-flex is-justify-content-space-between">
            <div
              className="is-flex is-flex-direction-column"
              style={{ width: "128px" }}
            >
              <figure className="image is-128x128" style={{ height: "auto" }}>
                <img src={profile_picture_url} alt={name} />
              </figure>
              <button
                className="button is-small is-link  my-2"
                onClick={() =>
                  dispatch(
                    setModalOpen({
                      isOpen: true,
                      modalType: "PROFILE_PICTURE_UPLOAD",
                    })
                  )
                }
              >
                <span className="icon ">
                  <FaCloudUploadAlt />
                </span>
                <span>Upload Image</span>
              </button>
            </div>
            <div className="is-flex is-flex-direction-column ">
              <button
                className="button is-link"
                onClick={() =>
                  dispatch(
                    setModalOpen({
                      isOpen: true,
                      modalType: "EDIT_PROFILE",
                    })
                  )
                }
              >
                <span className="icon is-small">
                  <FaEdit />
                </span>
              </button>
              <div className="my-2 tooltip">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={is_public}
                    onChange={(e) => {
                      dispatch(updateUser({ is_public: e.target.checked }));
                      dispatch(reset());
                    }}
                  />
                  <span className="slider"></span>
                </label>
                <span className="tooltip-text">Make your profile public</span>
              </div>
            </div>
          </div>

          <p className="title">{name}</p>
          <p className="subtitle">{email}</p>
          <span className="tag  is-dark">Age: {age}</span>
          <p className="is-size-6">{introduction}</p>
        </div>
      </>
    );
  };

  return (
    <section className="hero ">
      {" "}
      <ProfileContent />
      <h1 className="title is-size-5 has-text-centered">Work Experience</h1>
      <div className="is-flex my-4 is-justify-content-center">
        <button
          className="button  is-primary  is-align-items-center"
          onClick={() => {
            dispatch(
              setModalOpen({
                isOpen: true,
                modalType: "ADD_WORK_EXPERIENCE",
              })
            );
          }}
        >
          <FaPlusSquare />
          <span className="ml-2">Add Experience</span>
        </button>
      </div>
      {work_experience &&
        work_experience.map((data: any) => {
          return <WorkExperience data={data} />;
        })}
    </section>
  );
};
export default Dashboard;

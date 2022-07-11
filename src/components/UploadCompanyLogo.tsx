import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { updateCompanyLogoUrl } from "../features/user/userSlice";
import { setModalOpen } from "../features/utils/utilSlice";
import Modal from "./Modal";

const {
  REACT_APP_CLOUDINARY_IMAGE_URL,
  REACT_APP_CLOUDINARY_FILE_UPLOAD_PRESET,
  REACT_APP_CLOUDINARY_CLOUD_NAME,
} = process.env;

const url = `${REACT_APP_CLOUDINARY_IMAGE_URL}`;
const uploadPreset = `${REACT_APP_CLOUDINARY_FILE_UPLOAD_PRESET}`;
const cloudName = `${REACT_APP_CLOUDINARY_CLOUD_NAME}`;

const UploadCompanyLogo = ({ workExperienceId }: any) => {
  const [image, setImage] = useState<any>();
  const [isButtonLoading, setButtonLoading] = useState(false);
  const { isModalOpen } = useAppSelector((state) => state.util);
  const dispatch = useAppDispatch();
  const handleFileUpload = () => {
    try {
      setButtonLoading(true);
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", uploadPreset);
      data.append("cloud_name", cloudName);

      fetch(url, {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(
            updateCompanyLogoUrl({
              url: data.url,
              workExperienceId: workExperienceId,
            } as {
              url: string;
              workExperienceId: string;
            })
          );
          dispatch(
            setModalOpen({
              isOpen: false,
              modalType: "",
            })
          );
          setButtonLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setButtonLoading(false);
          toast.error("Something went wrong. Please try again!");
        });
    } catch (err: any) {
      setButtonLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <Modal
      isOpen={
        isModalOpen.modalType ===
        "COMPANY_LOGO_PICTURE_UPLOAD" + workExperienceId
          ? true
          : false
      }
    >
      <div
        className=" container has-text-centered has-background-white pt-8 pb-10 px-14 has-mw-md mx-auto "
        data-path="0.1.0"
      >
        <div className="p-3">
          <div className="file is-centered is-boxed is-success has-name">
            <label className="file-label">
              <input
                className="file-input"
                type="file"
                name="profile_pic"
                accept="image/*"
                onChange={(e: any) => {
                  setImage(e.target.files[0]);
                }}
              />
              <span className="file-cta">
                <span className="file-icon">{/* <FaFileUpload /> */}</span>
                <span className="file-label">Upload Your file</span>
              </span>
              <span className="file-name">{image && image.name}</span>
            </label>
          </div>
        </div>
        <div className="p-4">
          <button
            className={`button is-success ${
              isButtonLoading ? "is-loading" : ""
            } `}
            onClick={handleFileUpload}
          >
            <span className="icon is-small">
              <FaSave />
            </span>
            <span>Save</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UploadCompanyLogo;

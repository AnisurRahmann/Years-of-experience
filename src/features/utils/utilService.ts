import axios from "axios";

const {
  REACT_APP_CLOUDINARY_IMAGE_URL,
  REACT_APP_CLOUDINARY_FILE_UPLOAD_PRESET,
  REACT_APP_CLOUDINARY_CLOUD_NAME,
} = process.env;

const uploadImageToCloudinary = async (image: File | null) => {
  const url = `${REACT_APP_CLOUDINARY_IMAGE_URL}`;
  const uploadPreset = `${REACT_APP_CLOUDINARY_FILE_UPLOAD_PRESET}`;
  const cloudName = `${REACT_APP_CLOUDINARY_CLOUD_NAME}`;

  if (image !== null) {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", uploadPreset);
    formData.append("cloud_name", cloudName);

    const response = await axios.post(url, formData);
    return response.data;
  }
};

const utilService = {
  uploadImageToCloudinary,
};

export default utilService;

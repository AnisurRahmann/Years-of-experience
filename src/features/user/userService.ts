import axios from "axios";
const { REACT_APP_BASE_URL } = process.env;

const API_URL = `${REACT_APP_BASE_URL}/users/`;

const getUser = async (token: string, userId: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      AccessControlAllowOrigin: "*",
    },
  };
  const response = await axios.get(API_URL + userId, config);
  return response.data;
};

const updateUserProfileUrl = async (
  token: string,
  userId: string,
  url: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      AccessControlAllowOrigin: "*",
    },
  };
  const response = await axios.patch(
    API_URL + userId,
    { profile_picture_url: url },
    config
  );
  return response.data;
};

const updateCompanyLogoUrl = async (
  token: string,
  userId: string,
  data: any
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      AccessControlAllowOrigin: "*",
    },
  };
  const response = await axios.patch(
    API_URL + userId + "/" + data.workExperienceId,
    {
      company_logo_url: data.url,
    },
    config
  );
  return response.data;
};

const updateUser = async (
  token: string,
  userId: string,
  data: {
    name?: string;
    introduction?: string;
    age?: number | null;
    is_company?: boolean;
  }
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      AccessControlAllowOrigin: "*",
    },
  };
  const response = await axios.patch(API_URL + userId, data, config);
  return response.data;
};

const updateWorkExperience = async (
  token: string,
  userId: string,
  data: any
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      AccessControlAllowOrigin: "*",
    },
  };
  const response = await axios.patch(
    API_URL + userId + "/" + data.id,
    data,
    config
  );
  return response.data;
};

const addWorkExperience = async (token: string, userId: string, data: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      AccessControlAllowOrigin: "*",
    },
  };
  const response = await axios.post(
    API_URL + userId + "/workExperience",
    data,
    config
  );
  return response.data;
};

const deleteWorkExperience = async (
  token: string,
  userId: string,
  data: any
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      AccessControlAllowOrigin: "*",
    },
  };
  const response = await axios.delete(API_URL + userId + "/" + data.id, config);
  return response.data;
};

const userService = {
  getUser,
  updateUserProfileUrl,
  updateUser,
  updateWorkExperience,
  addWorkExperience,
  updateCompanyLogoUrl,
  deleteWorkExperience,
};

export default userService;

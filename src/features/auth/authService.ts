import axios from "axios";
import { UserLoginDataType, UserRegisterDataType } from "../../types/userTypes";

const { REACT_APP_BASE_URL } = process.env;
const API_URL = `${REACT_APP_BASE_URL}/auth/`;

const register = async (userData: UserRegisterDataType) => {
  const response = await axios.post(API_URL + "register", userData);
  if (response.data) {
    setWithExpiry("user", response.data, 86400000);
  }
  return response.data;
};

const login = async (userData: UserLoginDataType) => {
  const response = await axios.post(API_URL + "login", userData);
  if (response.data) {
    setWithExpiry("user", response.data, 86400000);
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const setWithExpiry = (key: string, value: any, ttl: number) => {
  const now = new Date();
  const item = {
    user: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

const getWithExpiry = (key: string) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.user;
};

const authService = {
  login,
  logout,
  register,
  getWithExpiry,
};

export default authService;

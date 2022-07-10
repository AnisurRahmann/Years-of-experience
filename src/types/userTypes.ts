export interface UserLoginDataType {
  email: String;
  password: String;
}

export interface UserRegisterDataType {
  name: String;
  email: String;
  password: String;
  confirmPassword?: String;
}

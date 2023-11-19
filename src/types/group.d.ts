export interface addUserForm {
  user_name: string;
  phone: string;
  email: string;
  department: string;
  role_id: number;
  work_number: string;
  sign_time: string;
  avatarPath?: string;
}
export interface userAuthorityDataType {
  idList: string;
  role_id: Number;
}
export interface IUserSearch {
  department?: string;
  userName?: string;
  workNumber?: string;
}
export interface IuserInfo {
  user_name: string;
  position: string;
  work_number: string;
  avatar_path: string;
}

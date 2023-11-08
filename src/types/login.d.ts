export interface ILoginData {
  operation: IOperation[];
  token: string;
  user: IUser;
}
export interface IUser {
  userId: number;
  loginName: string;
  userName: string;
  workNumber: string;
  sex: string;
  position: string;
  password: string;
  department: string;
  phone: string;
  email: string;
  status: string;
  avatarPath: string;
  createBy: number;
  createTime: string;
  updateBy: number;
  updateTime: string;
  signTime: string;
  roleId: number;
}
export interface IOperation {
  roleId: number;
  operationId: number;
  status: string;
}
